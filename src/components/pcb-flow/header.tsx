
"use client";

import Link from "next/link";
import { CircuitBoard, ShoppingCart, ChevronDown, User as UserIcon, LifeBuoy, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import React, { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"
import { LoadingLink } from "@/context/loading-context";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";


export function Header() {
  const { items } = useCart();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);
  
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
            
            {!loading && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                       <Avatar className="h-9 w-9">
                        <AvatarImage src={user.user_metadata.avatar_url} alt={user.email} />
                        <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.user_metadata.full_name || user.email}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <LoadingLink href="/account"><UserIcon className="mr-2 h-4 w-4" />Account</LoadingLink>
                    </DropdownMenuItem>
                     <DropdownMenuItem asChild>
                      <LoadingLink href="/order-history"><LayoutDashboard className="mr-2 h-4 w-4" />Order History</LoadingLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                       <LoadingLink href="#"><LifeBuoy className="mr-2 h-4 w-4" />Support</LoadingLink>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <form action="/auth/signout" method="post">
                        <button type="submit" className="w-full">
                           <DropdownMenuItem>
                             <LogOut className="mr-2 h-4 w-4" />
                            Sign out
                           </DropdownMenuItem>
                        </button>
                    </form>
                  </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                 <Button asChild>
                    <LoadingLink href="/login">Login</LoadingLink>
                </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
