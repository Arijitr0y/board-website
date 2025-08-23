
'use client';

import { useState } from "react";
import { Header } from "@/components/pcb-flow/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Settings, MapPin, Package, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type View = 'orders' | 'profile' | 'addresses' | 'settings';

const SidebarNavItem = ({
  icon,
  title,
  isActive,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
      isActive
        ? "bg-primary/10 text-primary font-semibold"
        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
    )}
  >
    {icon}
    <span className="flex-grow">{title}</span>
    <ChevronRight className={cn("h-5 w-5 transition-transform", isActive ? "translate-x-1" : "")} />
  </button>
);

const OrdersView = () => (
    <Card>
        <CardHeader>
            <CardTitle>My Orders</CardTitle>
        </CardHeader>
        <CardContent>
            <p>Track, view history, and manage your PCB orders. (Content for My Orders)</p>
        </CardContent>
    </Card>
);

const ProfileView = () => (
    <Card>
        <CardHeader>
            <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
            <p>Edit your personal details and contact information. (Content for Profile Information)</p>
        </CardContent>
    </Card>
);

const AddressesView = () => (
    <Card>
        <CardHeader>
            <CardTitle>Addresses</CardTitle>
        </CardHeader>
        <CardContent>
            <p>Manage your shipping and billing addresses. (Content for Addresses)</p>
        </CardContent>
    </Card>
);

const SettingsView = () => (
    <Card>
        <CardHeader>
            <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
            <p>Update your password and communication preferences. (Content for Account Settings)</p>
        </CardContent>
    </Card>
);

export default function AccountDashboardPage() {
  const [activeView, setActiveView] = useState<View>('orders');

  const renderContent = () => {
    switch (activeView) {
      case 'orders':
        return <OrdersView />;
      case 'profile':
        return <ProfileView />;
      case 'addresses':
        return <AddressesView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <OrdersView />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 py-12">
            <div className="mb-8">
                <h1 className="text-4xl font-extrabold tracking-tight">My Account</h1>
                <p className="text-lg text-muted-foreground mt-2">Manage your orders, personal information, and settings.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar */}
                <aside className="md:col-span-1">
                    <Card>
                       <CardContent className="p-2">
                           <nav className="space-y-1">
                               <SidebarNavItem 
                                   icon={<Package className="h-5 w-5" />}
                                   title="My Orders"
                                   isActive={activeView === 'orders'}
                                   onClick={() => setActiveView('orders')}
                                />
                               <SidebarNavItem 
                                   icon={<User className="h-5 w-5" />}
                                   title="Profile Information"
                                   isActive={activeView === 'profile'}
                                   onClick={() => setActiveView('profile')}
                                />
                               <SidebarNavItem 
                                   icon={<MapPin className="h-5 w-5" />}
                                   title="Addresses"
                                   isActive={activeView === 'addresses'}
                                   onClick={() => setActiveView('addresses')}
                                />
                               <SidebarNavItem 
                                   icon={<Settings className="h-5 w-5" />}
                                   title="Account Settings"
                                   isActive={activeView === 'settings'}
                                   onClick={() => setActiveView('settings')}
                                />
                           </nav>
                       </CardContent>
                    </Card>
                </aside>
                
                {/* Main Content */}
                <div className="md:col-span-3">
                    {renderContent()}
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
