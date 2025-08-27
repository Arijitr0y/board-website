

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
  MessageCircle,
  Ticket,
  ShieldCheck,
  FileText
} from "lucide-react"
import { Sidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { useAdminRole } from "@/context/admin-role-context";

const superAdminNav = [
    { href: "/admin/dashboard", icon: Home, label: "Dashboard" },
    { href: "/admin/users", icon: ShieldCheck, label: "User Management" },
    { href: "/admin/orders", icon: ShoppingCart, label: "All Orders" },
    { href: "/admin/customers", icon: Users2, label: "Customers" },
    { href: "/admin/products", icon: Package, label: "Products" },
    { href: "/admin/analytics", icon: LineChart, label: "Analytics" },
    { href: "/admin/logs", icon: FileText, label: "System Logs" },
    { href: "/admin/settings", icon: Settings, label: "Website Settings" },
];

const adminNav = [
    { href: "/admin/dashboard", icon: Home, label: "Dashboard" },
    { href: "/admin/orders", icon: ShoppingCart, label: "Order Management" },
    { href: "/admin/products", icon: Package, label: "Product Management" },
    { href: "/admin/customers", icon: Users2, label: "Customer Management" },
    { href: "/admin/analytics", icon: LineChart, label: "Reports" },
];

const employeeNav = [
    { href: "/admin/orders", icon: ShoppingCart, label: "Order Queue" },
    { href: "/admin/chat", icon: MessageCircle, label: "Customer Chat" },
];

const supportNav = [
    { href: "/admin/chat", icon: MessageCircle, label: "Live Chat" },
    { href: "/admin/tickets", icon: Ticket, label: "Support Tickets" },
    { href: "/admin/orders", icon: ShoppingCart, label: "Order Inquiry" },
];


export function AdminSidebar() {
    const { role } = useAdminRole();

    let navItems = adminNav;
    if (role === 'Super Admin') navItems = superAdminNav;
    if (role === 'Employee') navItems = employeeNav;
    if (role === 'Customer Support') navItems = supportNav;
    
    return (
        <Sidebar>
            <div className="flex h-full flex-col">
                <div className="flex flex-col items-center gap-4 px-2 sm:py-5">
                    <Link
                        href="#"
                        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                    >
                        <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                        <span className="sr-only">PCB Flow</span>
                    </Link>
                    <SidebarMenu className="w-full">
                        {navItems.map((item) => (
                             <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton href={item.href} tooltip={item.label}>
                                    <item.icon className="h-5 w-5" />
                                    <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </div>
                 {role === 'Super Admin' ? null : (
                     <div className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton href="/admin/settings" tooltip="Settings">
                                    <Settings className="h-5 w-5" />
                                    <span className="group-data-[collapsible=icon]:hidden">Settings</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </div>
                )}
            </div>
        </Sidebar>
    )
}
