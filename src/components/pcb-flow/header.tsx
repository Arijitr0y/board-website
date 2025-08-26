
"use client";

import Link from "next/link";
import { CircuitBoard, ShoppingCart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LoadingLink } from "@/context/loading-context";

export function Header() {
  const cart = useCart();
  const items = cart ? cart.items : [];
  
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
          </div>
        </div>
      </div>
    </header>
  );
}
