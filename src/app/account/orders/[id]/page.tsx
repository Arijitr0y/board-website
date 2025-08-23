
import React from "react";
import { Header } from "@/components/pcb-flow/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Check, Download, FileText, Package, Rocket, Truck, User, Wrench, Clock, Search } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";


const getOrderDetails = (id: string) => {
    // In a real app, you would fetch this from your database
    const orders = {
        'PCB-2024-003': { 
            id: 'PCB-2024-003', 
            projectName: 'IoT Weather Station', 
            gerberName: 'weather-station-v2.zip', 
            date: '2024-07-20', 
            status: 'In Fabrication',
            total: '₹8,500.00',
            specs: {
                layers: '2',
                size: '80x60mm',
                material: 'FR-4',
                thickness: '1.6mm',
                quantity: 15,
                maskColor: 'Green',
                finish: 'HASL',
            },
            shippingAddress: 'John Doe, Embassy Tech Village, Outer Ring Road, Bengaluru - 560103, India',
            history: [
                { status: 'In Fabrication', date: '2024-07-21 09:00 AM', description: 'PCB fabrication has started.' },
                { status: 'PCB in Review', date: '2024-07-20 11:00 AM', description: 'Your design files are being reviewed.' },
                { status: 'Order Placed', date: '2024-07-20 10:30 AM', description: 'Your order has been successfully placed.' },
            ]
        },
        'PCB-2024-002': { 
            id: 'PCB-2024-002', 
            projectName: 'Audio Amplifier Board', 
            gerberName: 'amp-board-rev-b.zip', 
            date: '2024-07-15', 
            status: 'Shipped',
            total: '₹12,350.00',
            specs: {
                layers: '4',
                size: '120x100mm',
                material: 'FR-4',
                thickness: '1.6mm',
                quantity: 10,
                maskColor: 'Black',
                finish: 'ENIG',
            },
            shippingAddress: 'John Doe, Embassy Tech Village, Outer Ring Road, Bengaluru - 560103, India',
            history: [
                 { status: 'Shipped', date: '2024-07-18 05:30 PM', description: 'Your order has been shipped via DTDC.' },
                 { status: 'In Fabrication', date: '2024-07-16 11:00 AM', description: 'PCB fabrication has completed.' },
                 { status: 'PCB in Review', date: '2024-07-15 03:00 PM', description: 'Your design files have been approved.' },
                 { status: 'Order Placed', date: '2024-07-15 02:00 PM', description: 'Your order has been successfully placed.' },
            ]
        },
        'PCB-2024-001': { 
            id: 'PCB-2024-001', 
            projectName: 'LED Matrix Display', 
            gerberName: 'led-display-controller.zip', 
            date: '2024-06-28', 
            status: 'Delivered',
            total: '₹5,200.00',
            specs: {
                layers: '2',
                size: '50x50mm',
                material: 'FR-4',
                thickness: '1.2mm',
                quantity: 20,
                maskColor: 'Red',
                finish: 'HASL',
            },
            shippingAddress: 'John Doe, Embassy Tech Village, Outer Ring Road, Bengaluru - 560103, India',
            history: [
                { status: 'Delivered', date: '2024-07-01 12:45 PM', description: 'Package delivered.' },
                { status: 'Shipped', date: '2024-06-29 08:00 AM', description: 'Your order has been shipped.' },
                { status: 'In Fabrication', date: '2024-06-28 02:00 PM', description: 'PCB fabrication has completed.' },
                { status: 'PCB in Review', date: '2024-06-28 10:00 AM', description: 'Your design files have been approved.' },
                { status: 'Order Placed', date: '2024-06-28 09:30 AM', description: 'Your order has been placed.' },
            ]
        },
    };
    // @ts-ignore
    const order = orders[id];
    if (!order) notFound();
    return order;
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

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
    const order = getOrderDetails(params.id);

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
                                <p className="text-muted-foreground">Order ID: {order.id} | Placed on {order.date}</p>
                            </div>
                            <div className="flex gap-2 mt-4 md:mt-0">
                                <Button variant="outline"><Download className="mr-2 h-4 w-4"/> Download Invoice</Button>
                                {order.status === "Shipped" && <Button><Truck className="mr-2 h-4 w-4"/> Track Package</Button>}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <StatusTimeline currentStatus={order.status} />
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <Card>
                                <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="font-medium">Project Name</TableCell>
                                                <TableCell>{order.projectName}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">Gerber File</TableCell>
                                                <TableCell>{order.gerberName}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">Order Total</TableCell>
                                                <TableCell>{order.total}</TableCell>
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
                                                <dd className="text-foreground">{value}</dd>
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
                                    <p>{order.shippingAddress}</p>
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
                             <Card>
                                <CardHeader><CardTitle>Order History</CardTitle></CardHeader>
                                <CardContent>
                                    <ul className="space-y-4">
                                        {order.history.map((item, index) => (
                                            <li key={index} className="flex gap-4">
                                                <div className="flex flex-col items-center">
                                                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${index === 0 ? 'bg-primary/20 text-primary' : 'bg-muted'}`}>
                                                        <Clock className="h-4 w-4" />
                                                    </div>
                                                    {index < order.history.length - 1 && <div className="w-px h-full bg-border" />}
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
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
