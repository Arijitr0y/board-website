
"use client";

import Link from "next/link";
import { CircuitBoard, ShoppingCart, ChevronDown, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils";

export function Header() {
  const cart = useCart();
  const items = cart ? cart.items : [];
  
  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <CircuitBoard className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">PCB Flow</h1>
          </Link>
          
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
               <Link href="/order" className="text-foreground/60 transition-colors hover:text-foreground/80">
                Instant Quote
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-1 px-2 text-foreground/60 transition-colors hover:text-foreground/80">
                    Services <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem asChild>
                    <Link href="/services/prototyping">PCB Prototyping</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/services/assembly">PCB Assembly</Link>
                  </DropdownMenuItem>
                   <DropdownMenuItem asChild>
                    <Link href="/services/dfm-analysis">DFM Analysis</Link>
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
                    <Link href="/resources/blog">Blog</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/resources/gerber-viewer">Gerber Viewer</Link>
                  </DropdownMenuItem>
                   <DropdownMenuItem asChild>
                    <Link href="/resources/capabilities">Capabilities</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
            <Button asChild variant="ghost" className="relative">
                <Link href="/cart">
                    <ShoppingCart className="h-5 w-5"/>
                    {items.length > 0 && (
                        <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground transform translate-x-1/2 -translate-y-1/2">
                            {items.length}
                        </span>
                    )}
                    <span className="sr-only">Cart</span>
                </Link>
            </Button>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/account/dashboard"><User className="mr-2 h-4 w-4" /> My Account</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
