
'use client';

import { useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { Header } from '@/components/pcb-flow/header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, User as UserIcon, Shield, History, Headset, Edit, PlusCircle, FileText } from 'lucide-react';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';

// Mock address type
type Address = {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
};


// Mock user data for local testing in Firestudio
const mockUser: User & { shippingAddress?: Address | null, billingAddress?: Address | null } = {
  id: 'mock-user-id',
  app_metadata: { provider: 'email' },
  user_metadata: { full_name: 'Arijit Roy (Test)', phone: '+91 12345 67890' },
  aud: 'authenticated',
  created_at: new Date().toISOString(),
  email: 'arijit1roy@gmail.com',
  shippingAddress: null,
  billingAddress: null,
};

const mockAllOrders = [
    {
    id: "ORD-003",
    date: "2023-06-25",
    status: "Fulfilled",
    total: "₹3,500.00",
    items: "Audio Amplifier Board Rev B (x5)"
  },
  {
    id: "ORD-001",
    date: "2023-06-23",
    status: "Fulfilled",
    total: "₹2,500.00",
    items: "IoT Weather Station v2 (x10)"
  },
];

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "Pending": return "secondary";
    case "Fulfilled": return "default";
    case "Canceled": return "destructive";
    default: return "outline";
  }
}

type ActiveView = 'profile' | 'orders' | 'security';

const NavLink = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
        onClick={onClick}
        className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
            active && "bg-muted text-primary"
        )}
    >
        {children}
    </button>
);


const AddressDialog = ({ address, onSave, children }: { address: Address | null, onSave: (newAddress: Address) => void, children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    // In a real app, form state would be managed here (e.g., with react-hook-form)
    
    const handleSave = () => {
        // Dummy save action
        const newAddress: Address = {
            fullName: 'Arijit Roy',
            addressLine1: 'Embassy Tech Village',
            addressLine2: 'Outer Ring Road',
            city: 'Bengaluru',
            state: 'Karnataka',
            zip: '560103',
            country: 'India',
            phone: '+91 98765 43210'
        };
        onSave(newAddress);
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{address ? 'Edit Address' : 'Add New Address'}</DialogTitle>
                    <DialogDescription>
                        Enter your address details here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Full Name</Label>
                        <Input id="name" defaultValue={address?.fullName} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="address1" className="text-right">Address 1</Label>
                        <Input id="address1" defaultValue={address?.addressLine1} className="col-span-3" />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="city" className="text-right">City</Label>
                        <Input id="city" defaultValue={address?.city} className="col-span-3" />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="state" className="text-right">State</Label>
                        <Input id="state" defaultValue={address?.state} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="zip" className="text-right">ZIP Code</Label>
                        <Input id="zip" defaultValue={address?.zip} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                    <Button type="submit" onClick={handleSave}>Save Address</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};


const AddressCard = ({ title, address, onUpdate }: { title: string, address: Address | null, onUpdate: (newAddress: Address | null) => void }) => (
    <Card className="flex-1">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-base">{title}</CardTitle>
             {address && (
                <Button variant="ghost" size="sm" onClick={() => {}} className="-mt-2 -mr-2">
                    <Edit className="mr-2 h-3 w-3" /> Edit
                </Button>
             )}
        </CardHeader>
        <CardContent className="pt-0">
            {address ? (
                <div className="text-sm text-muted-foreground space-y-1">
                    <p className="font-semibold text-foreground">{address.fullName}</p>
                    <p>{address.addressLine1}</p>
                    {address.addressLine2 && <p>{address.addressLine2}</p>}
                    <p>{address.city}, {address.state} {address.zip}</p>
                    <p>{address.country}</p>
                    <p>Phone: {address.phone}</p>
                </div>
            ) : (
                <AddressDialog address={address} onSave={onUpdate}>
                     <button className="w-full flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                        <PlusCircle className="h-10 w-10 mb-2" />
                        <span className="font-medium">Add {title}</span>
                    </button>
                </AddressDialog>
            )}
        </CardContent>
    </Card>
);


const ProfileInformation = ({ user, setUser }: { user: User & { shippingAddress?: Address | null, billingAddress?: Address | null }, setUser: Function }) => {
    
    const handleUpdateShipping = (newAddress: Address) => {
        setUser({ ...user, shippingAddress: newAddress });
    };

    const handleUpdateBilling = (newAddress: Address) => {
        setUser({ ...user, billingAddress: newAddress });
    };
    
    return (
    <Card>
        <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Manage your personal and address details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-4">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" defaultValue={user.user_metadata?.full_name} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue={user.email} disabled />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue={user.user_metadata?.phone} />
                </div>
            </div>

            <Separator />

            <div className="space-y-4">
                <h3 className="text-lg font-medium">Addresses</h3>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <AddressCard 
                        title="Shipping Address" 
                        address={user.shippingAddress}
                        onUpdate={handleUpdateShipping}
                    />
                    <AddressCard 
                        title="Billing Address" 
                        address={user.billingAddress}
                        onUpdate={handleUpdateBilling}
                    />
                </div>
            </div>
        </CardContent>
        <CardFooter>
            <Button>Save All Changes</Button>
        </CardFooter>
    </Card>
)};

const OrderHistory = () => (
     <Card>
        <CardHeader>
            <CardTitle>Order History</CardTitle>
            <CardDescription>A complete history of all your past orders.</CardDescription>
        </CardHeader>
        <CardContent>
           <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {mockAllOrders.map((order) => (
                    <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.items}</TableCell>
                        <TableCell><Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge></TableCell>
                        <TableCell className="text-right">{order.total}</TableCell>
                        <TableCell className="text-right">
                           <Button variant="outline" size="sm">View Details</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
           </Table>
        </CardContent>
        <CardFooter>
            <div className="text-xs text-muted-foreground">
                Showing <strong>1-{mockAllOrders.length}</strong> of <strong>{mockAllOrders.length}</strong> orders
            </div>
        </CardFooter>
    </Card>
);

const LoginAndSecurity = () => (
    <Card>
        <CardHeader>
            <CardTitle>Login & Security</CardTitle>
            <CardDescription>Manage your password and secure your account.</CardDescription>
        </CardHeader>
         <CardContent>
            <Button variant="outline" asChild>
                <Link href="/forgot-password">Change Password</Link>
            </Button>
        </CardContent>
    </Card>
);

export default function MyAccountPage() {
  const [user, setUser] = useState<any>(mockUser); // Use 'any' to allow dynamic updates to mock object
  const [activeView, setActiveView] = useState<ActiveView>('profile');

  if (!user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto max-w-6xl px-4 py-12">
            <div className="grid md:grid-cols-4 gap-10">
                <div className="md:col-span-1">
                     <div className="flex flex-col gap-4">
                        <div className="text-center md:text-left mb-4">
                            <h1 className="text-2xl font-bold">{user.user_metadata?.full_name || 'User'}</h1>
                            <p className="text-muted-foreground text-sm">{user.email}</p>
                        </div>
                        <nav className="grid items-start gap-1 text-sm font-medium">
                            <NavLink active={activeView === 'profile'} onClick={() => setActiveView('profile')}>
                                <UserIcon className="h-4 w-4" />
                                Profile Information
                            </NavLink>
                            <NavLink active={activeView === 'orders'} onClick={() => setActiveView('orders')}>
                                <History className="h-4 w-4" />
                                Order History
                            </NavLink>
                             <NavLink active={activeView === 'security'} onClick={() => setActiveView('security')}>
                                <Shield className="h-4 w-4" />
                                Login & Security
                            </NavLink>
                             <NavLink active={false} onClick={() => {}}>
                                <Headset className="h-4 w-4" />
                                Support Tickets
                            </NavLink>
                        </nav>
                     </div>
                </div>
                <div className="md:col-span-3">
                    {activeView === 'profile' && <ProfileInformation user={user} setUser={setUser} />}
                    {activeView === 'orders' && <OrderHistory />}
                    {activeView === 'security' && <LoginAndSecurity />}
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
