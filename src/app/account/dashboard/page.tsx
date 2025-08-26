
'use client';

import { useState, useEffect } from "react";
import { Header } from "@/components/pcb-flow/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { User, Settings, MapPin, Package, ChevronRight, Edit, Bell, LogOut, Trash2, Search, CreditCard, PlusCircle, Download, FileText, Truck, Eye, MessageSquare, ClipboardCheck, Mail, FileCheck, Send, Upload, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast";
import { deleteUserAccount } from "../actions";
import { supabase } from "@/lib/supabase-client";

type View = 'messages' | 'orders' | 'profile' | 'addresses' | 'settings' | 'payments';
type Order = {
    id: string;
    project_name: string;
    gerber_name: string;
    created_at: string;
    status: string;
}
type Address = {
    name: string;
    line1: string;
    city: string;
    zip: string;
    country: string;
};


const SidebarNavItem = ({
  icon,
  title,
  isActive,
  onClick,
  count,
}: {
  icon: React.ReactNode;
  title: string;
  isActive: boolean;
  onClick: () => void;
  count?: number;
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
    {count && count > 0 && (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {count}
        </span>
    )}
    <ChevronRight className={cn("h-5 w-5 transition-transform", isActive ? "translate-x-1" : "")} />
  </button>
);


const MessagesView = () => {
    const conversations = [
        {
            id: 1,
            subject: 'DFM Review: IoT Weather Station',
            relatedTo: 'DFM-2024-001',
            lastMessage: 'Sounds good, please proceed.',
            time: 'Jul 21, 2024, 2:15 PM',
            isUnread: false,
            messages: [
                { sender: 'M', text: 'Hi John, we noticed a potential issue with the trace clearances on your "IoT Weather Station" design. We recommend increasing the spacing to avoid shorts during fabrication. Do you approve this change?', time: 'Jul 20, 2024, 11:30 AM' },
                { sender: 'U', text: 'Thanks for catching that. Yes, please go ahead and make the recommended adjustment.', time: 'Jul 21, 2024, 9:45 AM' },
                { sender: 'M', text: 'Excellent, we will proceed with the updated design. Fabrication will begin shortly.', time: 'Jul 21, 2024, 10:00 AM' },
                { sender: 'U', text: 'Sounds good, please proceed.', time: 'Jul 21, 2024, 2:15 PM' },
            ],
        },
        {
            id: 2,
            subject: 'Order Update: PCB-2024-002',
            relatedTo: 'PCB-2024-002',
            lastMessage: 'Great, thanks for the update!',
            time: 'Jul 18, 2024, 5:30 PM',
            isUnread: true,
            messages: [
                 { sender: 'M', text: 'Your order PCB-2024-002 for the "Audio Amplifier Board" has been shipped. You can find the tracking details on the order page.', time: 'Jul 18, 2024, 5:30 PM' },
                 { sender: 'U', text: 'Great, thanks for the update!', time: 'Jul 18, 2024, 5:32 PM' },
            ]
        },
        {
            id: 3,
            subject: 'Payment Query: Invoice INV-2023-001',
            relatedTo: 'INV-2023-001',
            lastMessage: 'Yes, that resolves it. Thank you.',
            time: 'Jul 15, 2024, 11:00 AM',
            isUnread: false,
            messages: [
                { sender: 'U', text: 'Hi, I have a question about a charge on invoice INV-2023-001.', time: 'Jul 14, 2024, 3:00 PM' },
                { sender: 'M', text: 'Of course, I can help with that. Could you please specify the line item you are referring to?', time: 'Jul 14, 2024, 3:05 PM' },
                { sender: 'U', text: 'It was for the expedited shipping fee, I thought it was included.', time: 'Jul 14, 2024, 3:10 PM' },
                { sender: 'M', text: 'I see. The quote was updated to include that when the 2-day shipping was selected. I can send over the revised quote for your records.', time: 'Jul 15, 2024, 10:55 AM' },
                { sender: 'U', text: 'Yes, that resolves it. Thank you.', time: 'Jul 15, 2024, 11:00 AM' },
            ]
        },
    ];

    const [selectedConversation, setSelectedConversation] = useState(conversations[0]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>Communicate with our team about your orders and designs.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-h-[600px] border rounded-lg">
                    {/* Conversation List */}
                    <div className="md:col-span-1 border-r overflow-y-auto">
                        <div className="p-2">
                           <Input placeholder="Search messages..." className="w-full" />
                        </div>
                        <nav className="flex flex-col p-2">
                            {conversations.map(conv => (
                                <button key={conv.id}
                                    onClick={() => setSelectedConversation(conv)}
                                    className={cn(
                                        "p-3 text-left rounded-lg transition-colors w-full",
                                        selectedConversation.id === conv.id ? "bg-muted" : "hover:bg-muted/50"
                                    )}>
                                    <div className="flex justify-between items-start">
                                        <p className="font-semibold text-sm">{conv.subject}</p>
                                        {conv.isUnread && <span className="h-2 w-2 rounded-full bg-primary mt-1"></span>}
                                    </div>
                                    <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{conv.time}</p>
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Message View */}
                    <div className="md:col-span-2 flex flex-col">
                        {selectedConversation ? (
                            <>
                                <div className="p-4 border-b">
                                    <h3 className="font-semibold">{selectedConversation.subject}</h3>
                                    <p className="text-sm text-muted-foreground">Related to: {selectedConversation.relatedTo}</p>
                                </div>
                                <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                                    {selectedConversation.messages.map((msg, index) => (
                                        <div key={index} className={cn("flex items-end gap-2", msg.sender === 'U' ? "justify-end" : "justify-start")}>
                                            {msg.sender === 'M' && (
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src="/placeholder.svg" alt="Manufacturer" />
                                                    <AvatarFallback>M</AvatarFallback>
                                                </Avatar>
                                            )}
                                            <div className={cn(
                                                "max-w-xs md:max-w-md p-3 rounded-lg",
                                                msg.sender === 'U' ? "bg-primary text-primary-foreground" : "bg-muted"
                                            )}>
                                                <p className="text-sm">{msg.text}</p>
                                                <p className={cn("text-xs mt-1", msg.sender === 'U' ? "text-primary-foreground/70" : "text-muted-foreground")}>{msg.time}</p>
                                            </div>
                                             {msg.sender === 'U' && (
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                                    <AvatarFallback>U</AvatarFallback>
                                                </Avatar>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 border-t bg-background">
                                    <div className="relative">
                                        <Textarea placeholder="Type your message..." className="pr-16" rows={2}/>
                                        <Button type="submit" size="icon" className="absolute right-2.5 top-1/2 -translate-y-1/2">
                                            <Send className="h-4 w-4" />
                                            <span className="sr-only">Send</span>
                                        </Button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                               <MessageSquare className="h-16 w-16 mb-4" />
                                <p>Select a conversation to view messages.</p>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const OrdersView = () => {
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                const { data, error } = await supabase
                    .from('orders')
                    .select('id, project_name, gerber_name, created_at, status')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                if (error) {
                    console.warn(error);
                } else if (data) {
                    setOrders(data);
                }
            }
            setLoading(false);
        };
        fetchOrders();
    }, []);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'In Fabrication':
                return <Badge variant="secondary" className="bg-orange-100 text-orange-800">{status}</Badge>;
            case 'Shipped':
                return <Badge variant="secondary" className="bg-blue-100 text-blue-800">{status}</Badge>;
            case 'Delivered':
                return <Badge variant="secondary" className="bg-green-100 text-green-800">{status}</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };
    
    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>My Orders</CardTitle>
                    <CardDescription>Track, view history, and manage your PCB orders.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </CardContent>
            </Card>
        );
    }
    
    return (
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
               <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Project</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                         {orders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No orders found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            orders.map((order) => (
                            <TableRow key={order.id} className="cursor-pointer hover:bg-muted/50" onClick={() => router.push(`/account/orders/${order.id}`)}>
                                <TableCell className="font-medium">{order.id}</TableCell>
                                <TableCell>
                                    <div className="font-medium">{order.project_name}</div>
                                    <div className="text-xs text-muted-foreground">{order.gerber_name}</div>
                                </TableCell>
                                <TableCell>{getStatusBadge(order.status)}</TableCell>
                                <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">
                                    {order.status === 'Shipped' ? (
                                        <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); alert(`Tracking order ${order.id}`); }}>
                                            <Truck className="mr-2 h-4 w-4" />
                                            Track Order
                                        </Button>
                                    ) : (
                                        <Button variant="ghost" size="sm" asChild onClick={(e) => e.stopPropagation()}>
                                            <Link href={`/account/orders/${order.id}`}>
                                                <Eye className="mr-2 h-4 w-4" />
                                                View Details
                                            </Link>
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        )))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
};

const ProfileView = () => {
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState({
        fullName: '',
        email: '',
        phone: '',
        avatarUrl: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('full_name, email, phone, avatar_url')
                    .eq('id', user.id)
                    .single();

                if (error) {
                    console.warn(error);
                } else if (data) {
                    setProfileData({
                        fullName: data.full_name || '',
                        email: data.email || user.email || '',
                        phone: data.phone || '',
                        avatarUrl: data.avatar_url || ''
                    });
                }
            }
            setLoading(false);
        };
        fetchProfile();
    }, []);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData(prev => ({...prev, [name]: value}));
    }

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Edit your personal details and contact information.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Edit your personal details and contact information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center gap-6 pt-2">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={profileData.avatarUrl || `https://i.pravatar.cc/150?u=${profileData.email}`} alt="User profile picture" />
                        <AvatarFallback>{profileData.fullName?.[0] || 'U'}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                        <h3 className="font-medium">Profile Picture</h3>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                                <Upload className="mr-2 h-4 w-4" />
                                {profileData.avatarUrl ? 'Change' : 'Upload'}
                            </Button>
                            {profileData.avatarUrl && (
                                <Button variant="ghost" size="sm" onClick={() => setProfileData(p => ({...p, avatarUrl: ''}))}>
                                    Remove
                                </Button>
                            )}
                        </div>
                         <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 5MB.</p>
                    </div>
                </div>

                <Separator />

                <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" name="fullName" value={profileData.fullName} onChange={handleInputChange} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" type="email" value={profileData.email} onChange={handleInputChange} disabled />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" value={profileData.phone} onChange={handleInputChange} />
                </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
                <Button>Save Changes</Button>
            </CardFooter>
        </Card>
    );
};


const AddressDisplay = ({ title, address, onEditClick }: { title: string; address?: Address; onEditClick: () => void; }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <h3 className="font-semibold">{title}</h3>
            <Button variant="outline" size="sm" onClick={onEditClick}>
                <Edit className="mr-2 h-3 w-3" />
                {address ? 'Edit' : 'Add'}
            </Button>
        </CardHeader>
        <CardContent>
            {address && address.name ? (
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
    const [loading, setLoading] = useState(true);
    const [deliveryAddress, setDeliveryAddress] = useState<Address | undefined>(undefined);
    const [billingAddress, setBillingAddress] = useState<Address | undefined>(undefined);

    useEffect(() => {
        const fetchAddresses = async () => {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('delivery_address, billing_address')
                    .eq('id', user.id)
                    .single();

                if (error) {
                    console.warn(error);
                } else if (data) {
                    setDeliveryAddress(data.delivery_address as Address);
                    setBillingAddress(data.billing_address as Address);
                }
            }
            setLoading(false);
        };
        fetchAddresses();
    }, []);

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Addresses</CardTitle>
                    <CardDescription>Manage your shipping and billing addresses.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center items-center h-48">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </CardContent>
            </Card>
        )
    }

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
                    address={billingAddress}
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
            <Tabs defaultValue="invoice-history">
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

const SettingsView = () => {
    const { toast } = useToast();
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const result = await deleteUserAccount();
            if (result.success) {
                toast({
                    title: "Account Deleted",
                    description: "Your account has been permanently deleted.",
                });
                router.push('/');
                router.refresh();
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Deletion Failed",
                description: error instanceof Error ? error.message : "An unknown error occurred.",
            });
        } finally {
            setIsDeleting(false);
        }
    };


    return (
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
                    <p className="text-sm text-destructive/80">This action is permanent. Your account and all associated data will be removed immediately.</p>
                    
                     <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">Delete My Account</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your
                                account and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="bg-destructive hover:bg-destructive/90"
                                >
                                    {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Yes, delete my account
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardContent>
        </Card>
    );
};

export default function AccountDashboardPage() {
  const [activeView, setActiveView] = useState<View>('messages');
  const router = useRouter()

  useEffect(() => {
    // This check is temporarily disabled for testing in the iframe preview.
    // const checkUser = async () => {
    //   const { data: { user } } = await supabase.auth.getUser()
    //   if (!user) {
    //     router.push('/login')
    //   }
    // }
    // checkUser()
  }, [router])


  const renderContent = () => {
    switch (activeView) {
      case 'messages':
        return <MessagesView />;
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
                                   icon={<MessageSquare className="h-5 w-5" />}
                                   title="Messages"
                                   isActive={activeView === 'messages'}
                                   onClick={() => setActiveView('messages')}
                                   count={1}
                                />
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
