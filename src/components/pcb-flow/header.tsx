
"use client";

import Link from "next/link";
import { CircuitBoard, ShoppingCart, ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import React, { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { LoadingLink } from "@/context/loading-context";
import { createClient } from "@/lib/supabase/client";
import { SignOutButton } from "../auth/SignOutButton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function Header() {
  const { items } = useCart();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
        const supabase = createClient();
        const { data } = await supabase.auth.getUser();
        setUser(data.user);
        setLoading(false);
    };
    checkUser();
  }, [])
  
  const getInitials = (name: string) => {
    if (!name) return "?";
    const names = name.split(' ');
    const initials = names.map(n => n[0]).join('');
    return initials.toUpperCase().slice(0, 2);
  }

  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <LoadingLink href="/" className="flex items-center gap-3">
            <CircuitBoard className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">PCB Flow</h1>
          </LoadingLink>
          
          <div className="flex items-center gap-2">
            <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
               <LoadingLink href="/order" className="text-foreground/60 transition-colors hover:text-foreground/80">
                Instant Quote
              </LoadingLink>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-1 px-2 text-foreground/60 transition-colors hover:text-foreground/80">
                    Services <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem asChild>
                    <LoadingLink href="/services/prototyping">PCB Prototyping</LoadingLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <LoadingLink href="/services/assembly">PCB Assembly</LoadingLink>
                  </DropdownMenuItem>
                   <DropdownMenuItem asChild>
                    <LoadingLink href="/services/dfm-analysis">DFM Analysis</LoadingLink>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-1 px-2 text-foreground/60 transition-colors hover:text-foreground/80">
                    Resources <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                 <DropdownMenuContent align="start">
                  <DropdownMenuItem asChild>
                    <LoadingLink href="/resources/blog">Blog</LoadingLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <LoadingLink href="/resources/gerber-viewer">Gerber Viewer</LoadingLink>
                  </DropdownMenuItem>
                   <DropdownMenuItem asChild>
                    <LoadingLink href="/resources/capabilities">Capabilities</LoadingLink>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
            <Button asChild variant="ghost" className="relative">
                <LoadingLink href="/cart">
                    <ShoppingCart className="h-5 w-5"/>
                    {items.length > 0 && (
                        <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground transform translate-x-1/2 -translate-y-1/2">
                            {items.length}
                        </span>
                    )}
                    <span className="sr-only">Cart</span>
                </LoadingLink>
            </Button>
            
            {loading ? (
              <div className="h-8 w-24"></div> // Placeholder to prevent layout shift
            ) : user ? (
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{getInitials(user.user_metadata?.full_name)}</AvatarFallback>
                        </Avatar>
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                     <DropdownMenuLabel>
                        <p className="font-medium">{user.user_metadata?.full_name}</p>
                        <p className="text-xs text-muted-foreground font-normal">{user.email}</p>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                          <LoadingLink href="/my-account">My Account</LoadingLink>
                      </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                          <LoadingLink href="/order-history">Order History</LoadingLink>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild><SignOutButton /></DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            ) : (
                 <div className="flex items-center gap-2">
                    <Button asChild>
                        <LoadingLink href="/login">Login / Sign Up</LoadingLink>
                    </Button>
                 </div>
            )}
            
          </div>
        </div>
      </div>
    </header>
  );
}
