
"use client";

import Link from "next/link";
import { CircuitBoard, ShoppingCart, ChevronDown, User, FileText, LogIn, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import React, { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils";
import { LoadingLink } from "@/context/loading-context";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";

export function Header() {
  const cart = useCart();
  const items = cart ? cart.items : [];
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
    router.refresh();
  };
  
  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <LoadingLink href="/" className="flex items-center gap-3">
            <CircuitBoard className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">PCB Flow</h1>
          </LoadingLink>
          
          <div className="flex items-center gap-4">
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
            {user ? (
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                          <Avatar>
                              <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email} />
                              <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                          </Avatar>
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <LoadingLink href="/account/dashboard"><User className="mr-2 h-4 w-4" /> My Account</LoadingLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <LoadingLink href="/account/dashboard?view=payments"><FileText className="mr-2 h-4 w-4" /> Invoices</LoadingLink>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            ) : (
              <Button asChild>
                <LoadingLink href="/login"><LogIn className="mr-2 h-4 w-4"/> Login</LoadingLink>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
