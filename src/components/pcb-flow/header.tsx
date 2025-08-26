
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
} from "@/components/ui/dropdown-menu"
import { LoadingLink } from "@/context/loading-context";
import { createClient } from '@/lib/supabase/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";


export function Header() {
  const cart = useCart();
  const router = useRouter();
  const items = cart ? cart.items : [];
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient()
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      setIsLoading(false)
      // Refresh the page on auth state change to re-fetch server components
      router.refresh();
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router])
  
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
             {isLoading ? (
                <div className="h-8 w-20 animate-pulse rounded-md bg-muted" />
            ) : user ? (
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={`https://api.dicebear.com/7.x/identicon/svg?seed=${user.email}`} alt="user avatar" />
                                <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                             <Link href="/account">My Account</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/order-history">Order History</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <form action="/auth/signout" method="post">
                            <button type="submit" className="w-full text-left">
                                <DropdownMenuItem>
                                    Sign Out
                                </DropdownMenuItem>
                            </button>
                        </form>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Button asChild>
                    <Link href="/login">Login</Link>
                </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
