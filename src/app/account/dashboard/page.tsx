'use client';

import { useState } from "react";
import { Header } from "@/components/pcb-flow/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { User, Settings, MapPin, Package, ChevronRight, Edit, Bell, LogOut, Trash2, Search, CreditCard, PlusCircle, Download, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type View = 'orders' | 'profile' | 'addresses' | 'settings' | 'payments';

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
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <CardTitle>My Orders</CardTitle>
                    <CardDescription>Track, view history, and manage your PCB orders.</CardDescription>
                </div>
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by order ID or name..." className="pl-8 w-full md:w-64" />
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <div className="text-center py-12 text-muted-foreground">
                <p>No orders found.</p>
                <Button variant="link" className="mt-2">Start a new order</Button>
            </div>
        </CardContent>
    </Card>
);

const ProfileView = () => (
    <Card>
        <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Edit your personal details and contact information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue="+91 98765 43210" />
            </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
            <Button>Save Changes</Button>
        </CardFooter>
    </Card>
);

const AddressDisplay = ({ title, address, onEditClick }: { title: string; address?: { name: string; line1: string; city: string; zip: string; country: string; }; onEditClick: () => void; }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <h3 className="font-semibold">{title}</h3>
            <Button variant="outline" size="sm" onClick={onEditClick}>
                <Edit className="mr-2 h-3 w-3" />
                {address ? 'Edit' : 'Add'}
            </Button>
        </CardHeader>
        <CardContent>
            {address ? (
                <div className="text-sm text-muted-foreground">
                    <p className="font-medium text-foreground">{address.name}</p>
                    <p>{address.line1}</p>
                    <p>{address.city} - {address.zip}</p>
                    <p>{address.country}</p>
                </div>
            ) : (
                <p className="text-sm text-muted-foreground">No address set.</p>
            )}
        </CardContent>
    </Card>
)

const AddressesView = () => {
    const deliveryAddress = {
        name: "John Doe",
        line1: "Embassy Tech Village, Outer Ring Road",
        city: "Bengaluru",
        zip: "560103",
        country: "India"
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Addresses</CardTitle>
                <CardDescription>Manage your shipping and billing addresses.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <AddressDisplay
                    title="Delivery Address"
                    address={deliveryAddress}
                    onEditClick={() => { /* Handle edit */ }}
                />
                <AddressDisplay
                    title="Billing Address"
                    address={deliveryAddress} // Using same for now
                    onEditClick={() => { /* Handle edit */ }}
                />
            </CardContent>
        </Card>
    );
};


const PaymentMethodCard = ({ cardType, last4, expiry, isDefault }: { cardType: 'Visa' | 'Mastercard'; last4: string; expiry: string; isDefault: boolean }) => (
    <div className="border rounded-lg p-4 flex justify-between items-center bg-muted/50">
        <div className="flex items-center gap-4">
            <CreditCard className="h-8 w-8 text-muted-foreground" />
            <div>
                <p className="font-semibold">{cardType} ending in {last4}</p>
                <p className="text-sm text-muted-foreground">Expires {expiry}</p>
            </div>
        </div>
        <div className="flex items-center gap-2">
            {isDefault && <Badge variant="secondary">Default</Badge>}
            <Button variant="ghost" size="sm">Edit</Button>
        </div>
    </div>
);

const InvoiceHistoryTable = () => {
    const invoices = [
        { id: 'INV-2023-001', date: '2023-10-15', amount: '₹12,500.00', status: 'Paid' },
        { id: 'INV-2023-002', date: '2023-09-22', amount: '₹8,750.00', status: 'Paid' },
        { id: 'INV-2023-003', date: '2023-08-30', amount: '₹15,200.00', status: 'Paid' },
    ];
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.amount}</TableCell>
                        <TableCell><Badge variant={invoice.status === 'Paid' ? 'default' : 'destructive'} className="bg-accent text-accent-foreground">{invoice.status}</Badge></TableCell>
                        <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                                <Download className="mr-2 h-4 w-4" />
                                Download
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

const PaymentsView = () => (
    <Card>
        <CardHeader>
            <CardTitle>Payments &amp; Invoices</CardTitle>
            <CardDescription>Manage your saved payment methods and view your invoice history.</CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="payment-methods">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
                    <TabsTrigger value="invoice-history">Invoice History</TabsTrigger>
                </TabsList>
                <TabsContent value="payment-methods" className="mt-6">
                     <div className="space-y-4">
                        <PaymentMethodCard cardType="Visa" last4="1234" expiry="08/2026" isDefault={true} />
                        <PaymentMethodCard cardType="Mastercard" last4="5678" expiry="12/2024" isDefault={false} />
                        <Button variant="outline" className="w-full">
                           <PlusCircle className="mr-2 h-4 w-4" /> Add a new payment method
                        </Button>
                    </div>
                </TabsContent>
                <TabsContent value="invoice-history" className="mt-6">
                    <InvoiceHistoryTable />
                </TabsContent>
            </Tabs>
        </CardContent>
    </Card>
);

const SettingsView = () => (
    <Card>
        <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Update your password and communication preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <h4 className="font-medium">Change Password</h4>
                <p className="text-sm text-muted-foreground">For your security, we recommend using a strong, unique password.</p>
                <Button variant="outline">Change Password</Button>
            </div>
            
            <Separator />

            <div className="space-y-4">
                <h4 className="font-medium">Communication Preferences</h4>
                 <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <Label htmlFor="newsletter" className="font-medium flex items-center gap-2"><Bell className="h-4 w-4"/>Promotions &amp; Newsletter</Label>
                      <p className="text-xs text-muted-foreground mt-1">Receive updates on new products, special offers, and more.</p>
                    </div>
                    <Switch id="newsletter" defaultChecked />
                </div>
            </div>
            
            <Separator />

            <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2"><LogOut className="h-5 w-5"/>Session Management</h4>
                <p className="text-sm text-muted-foreground">This will log you out of all other active sessions on other devices.</p>
                <Button variant="outline">Log Out From All Devices</Button>
            </div>
            
            <Separator />
            
            <div className="space-y-2 p-4 rounded-lg border border-destructive/50 bg-destructive/10">
                <h4 className="font-medium flex items-center gap-2 text-destructive"><Trash2 className="h-5 w-5"/>Delete My Account</h4>
                <p className="text-sm text-destructive/80">This action is permanent. Your account will be scheduled for deletion and will be permanently removed after 60 days if you do not log in.</p>
                <Button variant="destructive">Delete My Account</Button>
            </div>
        </CardContent>
    </Card>
);

export default function AccountDashboardPage() {
  const [activeView, setActiveView] = useState<View>('profile');

  const renderContent = () => {
    switch (activeView) {
      case 'orders':
        return <OrdersView />;
      case 'profile':
        return <ProfileView />;
      case 'addresses':
        return <AddressesView />;
      case 'payments':
        return <PaymentsView />;
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
                                   icon={<CreditCard className="h-5 w-5" />}
                                   title="Payments & Invoices"
                                   isActive={activeView === 'payments'}
                                   onClick={() => setActiveView('payments')}
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
