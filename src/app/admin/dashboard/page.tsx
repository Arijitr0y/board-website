
'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
  } from "@/components/ui/card"
import { DollarSign, Package, Users, FileCheck, ArrowUpRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
  
const chartData = [
  { month: "Jan", revenue: 186000 },
  { month: "Feb", revenue: 305000 },
  { month: "Mar", revenue: 237000 },
  { month: "Apr", revenue: 73000 },
  { month: "May", revenue: 209000 },
  { month: "Jun", revenue: 214000 },
  { month: "Jul", revenue: 450000 },
]

const recentOrders = [
    {
        name: 'Olivia Martin',
        email: 'olivia.martin@email.com',
        avatar: '/avatars/01.png',
        amount: '₹1,999.00',
    },
    {
        name: 'Jackson Lee',
        email: 'jackson.lee@email.com',
        avatar: '/avatars/02.png',
        amount: '₹39.00',
    },
    {
        name: 'Isabella Nguyen',
        email: 'isabella.nguyen@email.com',
        avatar: '/avatars/03.png',
        amount: '₹299.00',
    },
    {
        name: 'William Kim',
        email: 'will@email.com',
        avatar: '/avatars/04.png',
        amount: '₹99.00',
    },
    {
        name: 'Sofia Davis',
        email: 'sofia.davis@email.com',
        avatar: '/avatars/05.png',
        amount: '₹39.00',
    }
];

export default function Dashboard() {
    return (
        <div className="grid gap-4 md:gap-8 auto-rows-max">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Revenue
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹3,145,231.89</div>
                        <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Orders
                        </CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+2350</div>
                        <p className="text-xs text-muted-foreground">
                            +180.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">New Customers</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+122</div>
                        <p className="text-xs text-muted-foreground">
                            +19% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                        <FileCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+57</div>
                        <p className="text-xs text-muted-foreground">
                            +1 since last hour
                        </p>
                    </CardContent>
                </Card>
            </div>
             <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                 <Card className="xl:col-span-2">
                    <CardHeader>
                        <CardTitle>Revenue Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value / 1000}K`} />
                                <Bar dataKey="revenue" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                 </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                        <CardDescription>You made 265 sales this month.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        {recentOrders.map((order, index) => (
                             <div key={index} className="flex items-center gap-4">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage src={`https://i.pravatar.cc/150?u=${order.email}`} alt="Avatar" />
                                    <AvatarFallback>{order.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">{order.name}</p>
                                    <p className="text-sm text-muted-foreground">{order.email}</p>
                                </div>
                                <div className="ml-auto font-medium">{order.amount}</div>
                            </div>
                        ))}
                    </CardContent>
                    <CardFooter>
                         <Button asChild size="sm" className="w-full">
                            <Link href="/admin/orders">View All</Link>
                        </Button>
                    </CardFooter>
                 </Card>
            </div>
        </div>
    )
}
