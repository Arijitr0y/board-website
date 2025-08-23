
'use client'

import Link from "next/link";
import {
  Home,
  LineChart,
  Package,
  Package2,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react"
import { Sidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

export function AdminSidebar() {
    return (
        <Sidebar>
            <div className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
                href="#"
                className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
                <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                <span className="sr-only">PCB Flow</span>
            </Link>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton href="/admin/dashboard" tooltip="Dashboard">
                        <Home className="h-5 w-5" />
                        <span className="group-data-[collapsible=icon]:hidden">Dashboard</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton href="#" tooltip="Orders" isActive>
                        <ShoppingCart className="h-5 w-5" />
                        <span className="group-data-[collapsible=icon]:hidden">Orders</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                     <SidebarMenuButton href="#" tooltip="Products">
                        <Package className="h-5 w-5" />
                        <span className="group-data-[collapsible=icon]:hidden">Products</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                     <SidebarMenuButton href="#" tooltip="Customers">
                        <Users2 className="h-5 w-5" />
                        <span className="group-data-[collapsible=icon]:hidden">Customers</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                     <SidebarMenuButton href="#" tooltip="Analytics">
                        <LineChart className="h-5 w-5" />
                        <span className="group-data-[collapsible=icon]:hidden">Analytics</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
            </div>
            <div className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                 <SidebarMenu>
                    <SidebarMenuItem>
                         <SidebarMenuButton href="#" tooltip="Settings">
                            <Settings className="h-5 w-5" />
                            <span className="group-data-[collapsible=icon]:hidden">Settings</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                 </SidebarMenu>
            </div>
        </Sidebar>
    )
}
