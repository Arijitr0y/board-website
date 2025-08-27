
'use client';

import { useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import { Header } from '@/components/pcb-flow/header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, User as UserIcon, Shield, History, Headset, Edit, PlusCircle, FileText, Package, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import type { Address } from '@/types';
import { updateUserProfile } from './actions';
import { useToast } from '@/hooks/use-toast';


type Profile = {
  id: string;
  full_name: string | null;
  phone: string | null;
  company_name: string | null;
  gst_number: string | null;
  shipping_address: Address | null;
  billing_address: Address | null;
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

const mockRecentOrders = mockAllOrders.slice(0, 3);

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "Pending": return "secondary";
    case "Fulfilled": return "default";
    case "Canceled": return "destructive";
    default: return "outline";
  }
}

type ActiveView = 'dashboard' | 'profile' | 'orders' | 'security';

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


const AddressDialog = ({ address, onSave, children, isEditing }: { address: Address | null, onSave: (newAddress: Address) => void, children: React.ReactNode, isEditing: boolean }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState<Partial<Address>>(address || {});
    const [isFetchingPincode, setIsFetchingPincode] = useState(false);

    useEffect(() => {
        if (address) {
            setFormData(address);
        } else {
            setFormData({});
        }
    }, [address]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };
    
    const handlePincodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const zip = e.target.value;
        setFormData(prev => ({ ...prev, zip }));

        if (zip.length === 6) {
            setIsFetchingPincode(true);
            try {
                const response = await fetch(`https://api.postalpincode.in/pincode/${zip}`);
                const data = await response.json();
                
                if (data && data[0] && data[0].Status === 'Success' && data[0].PostOffice[0]) {
                    const postOffice = data[0].PostOffice[0];
                    setFormData(prev => ({
                        ...prev,
                        city: postOffice.District,
                        state: postOffice.State,
                        country: postOffice.Country,
                    }));
                } else {
                     setFormData(prev => ({ ...prev, city: '', state: '', country: 'India' }));
                }

            } catch (error) {
                console.error("Failed to fetch pincode data:", error);
                 setFormData(prev => ({ ...prev, city: '', state: '', country: 'India' }));
            } finally {
                setIsFetchingPincode(false);
            }
        }
    };

    const handleSave = () => {
        const newAddress: Address = {
            fullName: formData.fullName || '',
            companyName: formData.companyName || '',
            gstNumber: formData.gstNumber || '',
            addressLine1: formData.addressLine1 || '',
            city: formData.city || '',
            state: formData.state || '',
            zip: formData.zip || '',
            country: formData.country || 'India',
            phone: formData.phone || ''
        };
        onSave(newAddress);
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{address ? 'Edit Address' : 'Add New Address'}</DialogTitle>
                    <DialogDescription>
                        Enter your address details here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" value={formData.fullName || ''} onChange={handleInputChange} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name <span className="text-muted-foreground">(Optional)</span></Label>
                        <Input id="companyName" value={formData.companyName || ''} onChange={handleInputChange} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="gstNumber">GST No. <span className="text-muted-foreground">(Optional)</span></Label>
                        <Input id="gstNumber" value={formData.gstNumber || ''} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="addressLine1">Address Line 1</Label>
                        <Input id="addressLine1" value={formData.addressLine1 || ''} onChange={handleInputChange} />
                    </div>
                    <div className="relative space-y-2">
                        <Label htmlFor="zip">ZIP / Pincode</Label>
                        <Input id="zip" value={formData.zip || ''} onChange={handlePincodeChange} maxLength={6} />
                         {isFetchingPincode && <Loader2 className="absolute right-2 top-8 h-4 w-4 animate-spin" />}
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" value={formData.city || ''} onChange={handleInputChange} disabled={isFetchingPincode} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Input id="state" value={formData.state || ''} onChange={handleInputChange} disabled={isFetchingPincode} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input id="country" value={formData.country || ''} onChange={handleInputChange} disabled={isFetchingPincode} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" value={formData.phone || ''} onChange={handleInputChange} />
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


const AddressCard = ({ title, address, onUpdate, isEditing }: { title: string, address: Address | null, onUpdate: (newAddress: Address | null) => void, isEditing: boolean }) => (
    <Card className="flex-1">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-base">{title}</CardTitle>
             {address && isEditing && (
                 <AddressDialog address={address} onSave={onUpdate} isEditing={isEditing}>
                    <Button variant="ghost" size="sm" className="-mt-2 -mr-2">
                        <Edit className="mr-2 h-3 w-3" /> Edit
                    </Button>
                 </AddressDialog>
             )}
        </CardHeader>
        <CardContent className="pt-0 min-h-[160px] flex flex-col justify-center">
            {address ? (
                <div className="text-sm text-muted-foreground space-y-1">
                    <p className="font-semibold text-foreground">{address.fullName}</p>
                    {address.companyName && <p>{address.companyName}</p>}
                    <p>{address.addressLine1}</p>
                    {address.addressLine2 && <p>{address.addressLine2}</p>}
                    <p>{address.city}, {address.state} {address.zip}</p>
                    <p>{address.country}</p>
                    <p>Phone: {address.phone}</p>
                    {address.gstNumber && <p>GST: {address.gstNumber}</p>}
                </div>
            ) : (
                <AddressDialog address={address} onSave={onUpdate} isEditing={isEditing}>
                     <button className="w-full flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg text-muted-foreground hover:border-primary hover:text-primary transition-colors disabled:cursor-not-allowed disabled:opacity-50" disabled={!isEditing}>
                        <PlusCircle className="h-10 w-10 mb-2" />
                        <span className="font-medium">Add {title}</span>
                    </button>
                </AddressDialog>
            )}
        </CardContent>
    </Card>
);


const ProfileInformation = ({ user, profile, onProfileUpdate }: { user: User | null, profile: Profile, onProfileUpdate: (newProfile: Profile) => void }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();

    const [formData, setFormData] = useState(profile);

    useEffect(() => {
        setFormData(profile);
    }, [profile]);
    
    const [useSameAddress, setUseSameAddress] = useState(
      JSON.stringify(profile.shipping_address) === JSON.stringify(profile.billing_address) &&
      profile.shipping_address !== null
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleUpdateAddress = (type: 'shipping_address' | 'billing_address', newAddress: Address | null) => {
        const updatedData = { ...formData, [type]: newAddress };
        if (type === 'shipping_address' && useSameAddress) {
            updatedData.billing_address = newAddress;
        }
        setFormData(updatedData);
    };

    const handleToggleSameAddress = (checked: boolean) => {
        setUseSameAddress(checked);
        if (checked) {
             setFormData(prev => ({ ...prev, billing_address: prev.shipping_address }));
        }
    };

    const handleSaveChanges = async () => {
        if (!user) return;
        setIsSaving(true);
        const result = await updateUserProfile({
            fullName: formData.full_name || '',
            phone: formData.phone || '',
            companyName: formData.company_name || '',
            gstNumber: formData.gst_number || '',
            shippingAddress: formData.shipping_address,
            billingAddress: formData.billing_address,
        });

        if (result.error) {
            toast({
                variant: 'destructive',
                title: 'Error updating profile',
                description: result.error,
            });
        } else {
            toast({
                title: 'Profile Updated',
                description: 'Your changes have been saved successfully.',
            });
            onProfileUpdate(formData); // Update parent state
            setIsEditing(false);
        }
        setIsSaving(false);
    };

    const handleCancel = () => {
        setFormData(profile); // Revert changes
        setIsEditing(false);
    };
    
    return (
    <Card>
        <CardHeader className="flex flex-row items-start justify-between">
            <div>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your personal and address details.</CardDescription>
            </div>
            {!isEditing ? (
                 <Button variant="outline" onClick={() => setIsEditing(true)}>
                    <Edit className="mr-2 h-4 w-4" /> Edit Profile
                 </Button>
            ) : null}
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-4">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="full_name">Full Name</Label>
                        <Input id="full_name" value={formData.full_name || ''} onChange={handleInputChange} disabled={!isEditing} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" value={user?.email || ''} disabled />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" value={formData.phone || ''} onChange={handleInputChange} disabled={!isEditing} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="company_name">Company Name <span className="text-muted-foreground">(Optional)</span></Label>
                        <Input id="company_name" value={formData.company_name || ''} onChange={handleInputChange} disabled={!isEditing} />
                    </div>
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="gst_number">GST Number <span className="text-muted-foreground">(Optional)</span></Label>
                        <Input id="gst_number" value={formData.gst_number || ''} onChange={handleInputChange} disabled={!isEditing} />
                    </div>
                </div>
            </div>

            <Separator />

            <div className="space-y-4">
                <h3 className="text-lg font-medium">Addresses</h3>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <AddressCard 
                        title="Shipping Address" 
                        address={formData.shipping_address}
                        onUpdate={(addr) => handleUpdateAddress('shipping_address', addr)}
                        isEditing={isEditing}
                    />
                     <div className="flex items-center space-x-2 mt-4 lg:col-span-2">
                        <Switch id="same-address" checked={useSameAddress} onCheckedChange={handleToggleSameAddress} disabled={!isEditing}/>
                        <Label htmlFor="same-address">Billing address is the same as shipping</Label>
                    </div>
                    {!useSameAddress && (
                        <AddressCard 
                            title="Billing Address" 
                            address={formData.billing_address}
                            onUpdate={(addr) => handleUpdateAddress('billing_address', addr)}
                            isEditing={isEditing}
                        />
                    )}
                </div>
            </div>
        </CardContent>
        {isEditing && (
            <CardFooter className="justify-end gap-2">
                <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSaveChanges} disabled={isSaving}>
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                </Button>
            </CardFooter>
        )}
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


const AccountDashboard = () => (
     <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Total Orders
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{mockAllOrders.length}</div>
                <p className="text-xs text-muted-foreground">
                    Across all time
                </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Lifetime Spend
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">₹6,000.00</div>
                 <p className="text-xs text-muted-foreground">
                    Based on {mockAllOrders.length} fulfilled orders
                </p>
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Button variant="outline" size="sm" asChild>
                   <Link href="/order-history">View All</Link>
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockRecentOrders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium">{order.id}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell><Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge></TableCell>
                                <TableCell className="text-right">{order.total}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
);


export default function MyAccountPage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activeView, setActiveView] = useState<ActiveView>('profile');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileData) {
          setProfile(profileData);
        } else if (error) {
          console.error("Error fetching profile:", error);
          // Don't redirect, maybe show an error to create a profile
        }
      } else {
        router.push('/login');
      }
      setLoading(false);
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
          fetchUserAndProfile();
        } else if (event === 'SIGNED_OUT') {
          router.push('/login');
        }
      }
    );
    
    fetchUserAndProfile();

    return () => {
      authListener.subscription.unsubscribe();
    };

  }, [router, supabase]);

  if (loading || !user || !profile) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  const handleProfileUpdate = (newProfile: Profile) => {
      setProfile(newProfile);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto max-w-6xl px-4 py-12">
            <div className="grid md:grid-cols-4 gap-10">
                <div className="md:col-span-1">
                     <div className="flex flex-col gap-4">
                        <div className="text-center md:text-left mb-4">
                            <h1 className="text-2xl font-bold">{profile.full_name || user.email}</h1>
                            <p className="text-muted-foreground text-sm">{user.email}</p>
                        </div>
                        <nav className="grid items-start gap-1 text-sm font-medium">
                            <NavLink active={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')}>
                                <FileText className="h-4 w-4" />
                                Dashboard
                            </NavLink>
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
                    {activeView === 'dashboard' && <AccountDashboard />}
                    {activeView === 'profile' && <ProfileInformation user={user} profile={profile} onProfileUpdate={handleProfileUpdate} />}
                    {activeView === 'orders' && <OrderHistory />}
                    {activeView === 'security' && <LoginAndSecurity />}
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
