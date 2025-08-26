
'use client';

import React, { useEffect, useState } from "react";
import { Header } from "@/components/pcb-flow/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Check, Download, FileText, Package, Rocket, Truck, User, Wrench, Clock, Search, Loader2 } from "lucide-react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";

type OrderDetails = {
    id: string;
    project_name: string;
    gerber_name: string;
    created_at: string;
    status: string;
    total: number;
    specs: Record<string, any>;
    shipping_address: string;
    history: { status: string; date: string; description: string; }[];
};

const StatusTimeline = ({ currentStatus }: { currentStatus: string }) => {
    const statuses = [
      { name: "Order Placed", icon: Check },
      { name: "PCB in Review", icon: Search },
      { name: "In Fabrication", icon: Rocket },
      { name: "Shipped", icon: Truck },
      { name: "Delivered", icon: Package },
    ];
    const currentIndex = statuses.findIndex(s => s.name === currentStatus);

    return (
        <div className="flex justify-between items-start my-6">
            {statuses.map((status, index) => (
                <div key={status.name} className="flex-1 text-center relative group">
                    <div className="flex flex-col items-center">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-full border-2 ${index <= currentIndex ? 'bg-primary border-primary text-primary-foreground' : 'bg-muted border-border'}`}>
                            <status.icon className="h-6 w-6" />
                        </div>
                        <p className={`mt-2 text-sm font-medium ${index <= currentIndex ? 'text-foreground' : 'text-muted-foreground'}`}>{status.name}</p>
                    </div>
                     {index < statuses.length - 1 && (
                        <div className={`absolute top-6 left-1/2 w-full h-0.5 ${index < currentIndex ? 'bg-primary' : 'bg-border'}`} />
                    )}
                </div>
            ))}
        </div>
    )
}

const OrderHistoryCard = ({ history }: { history: { status: string; date: string; description: string; }[] }) => (
    <Card>
        <CardHeader><CardTitle>Order History</CardTitle></CardHeader>
        <CardContent>
            <ul className="space-y-4">
                {history.map((item, index) => (
                    <li key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${index === 0 ? 'bg-primary/20 text-primary' : 'bg-muted'}`}>
                                <Clock className="h-4 w-4" />
                            </div>
                            {index < history.length - 1 && <div className="w-px h-full bg-border" />}
                        </div>
                        <div>
                            <p className="font-medium">{item.status}</p>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                            <time className="text-xs text-muted-foreground">{item.date}</time>
                        </div>
                    </li>
                ))}
            </ul>
        </CardContent>
    </Card>
);

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [order, setOrder] = useState<OrderDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                const { data, error } = await supabase
                    .from('orders')
                    .select('*')
                    .eq('id', params.id)
                    .eq('user_id', user.id)
                    .single();

                if (error || !data) {
                    console.warn(error);
                    notFound();
                } else {
                    setOrder(data as OrderDetails);
                }
            }
            setLoading(false);
        };
        fetchOrderDetails();
    }, [router, params.id]);

    useEffect(() => {
        // This check is temporarily disabled for testing in the iframe preview.
        // const checkUser = async () => {
        //   const { data: { user } } = await supabase.auth.getUser()
        //   if (!user) {
        //     router.push('/login')
        //   }
        // }
        // checkUser()
    }, [router]);

    if (loading) {
        return (
            <div className="flex min-h-screen flex-col bg-background">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <Loader2 className="h-16 w-16 animate-spin text-primary" />
                </main>
            </div>
        )
    }

    if (!order) {
        return notFound();
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);
    };

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1 bg-gray-50 dark:bg-gray-900/50">
                <div className="container mx-auto px-4 py-12">
                    <div className="mb-6">
                        <Button variant="outline" asChild>
                            <Link href="/account/dashboard" className="inline-flex items-center gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                Back to My Orders
                            </Link>
                        </Button>
                    </div>
                    
                    <Card className="mb-8">
                        <CardHeader className="flex flex-col md:flex-row justify-between md:items-center">
                            <div>
                                <h1 className="text-2xl font-bold">Order Details</h1>
                                <p className="text-muted-foreground">Order ID: {order.id} | Placed on {new Date(order.created_at).toLocaleDateString()}</p>
                            </div>
                            <div className="flex gap-2 mt-4 md:mt-0">
                                <Button variant="outline"><Download className="mr-2 h-4 w-4"/> Download Invoice</Button>
                                {order.status === "Shipped" && <Button><Truck className="mr-2 h-4 w-4"/> Track Package</Button>}
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 pt-0">
                            <StatusTimeline currentStatus={order.status} />
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <OrderHistoryCard history={order.history} />

                            <Card>
                                <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="font-medium">Project Name</TableCell>
                                                <TableCell>{order.project_name}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">Gerber File</TableCell>
                                                <TableCell>{order.gerber_name}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">Order Total</TableCell>
                                                <TableCell>{formatCurrency(order.total)}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">Status</TableCell>
                                                <TableCell><Badge variant="secondary">{order.status}</Badge></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                             <Card>
                                <CardHeader><CardTitle>PCB Specifications</CardTitle></CardHeader>
                                <CardContent>
                                    <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                        {Object.entries(order.specs).map(([key, value]) => (
                                            <React.Fragment key={key}>
                                                <dt className="font-medium capitalize text-muted-foreground">{key.replace(/([A-Z])/g, ' $1')}</dt>
                                                <dd className="text-foreground">{String(value)}</dd>
                                            </React.Fragment>
                                        ))}
                                    </dl>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-8">
                             <Card>
                                <CardHeader><CardTitle>Shipping Address</CardTitle></CardHeader>
                                <CardContent className="text-sm text-muted-foreground">
                                    <p>{order.shipping_address}</p>
                                </CardContent>
                            </Card>
                             <Card>
                                <CardHeader><CardTitle>Payment Information</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-muted-foreground" />
                                        <p className="text-sm">Paid with Visa ending in 1234</p>
                                    </div>
                                    <Button variant="link" className="p-0 h-auto mt-2">View Invoice</Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
