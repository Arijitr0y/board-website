
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, Pie, PieChart, Cell } from "recharts"
import { TrendingUp, Users, Package, DollarSign } from "lucide-react"

const chartData = [
  { month: "January", revenue: 186000 },
  { month: "February", revenue: 305000 },
  { month: "March", revenue: 237000 },
  { month: "April", revenue: 73000 },
  { month: "May", revenue: 209000 },
  { month: "June", revenue: 214000 },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
}

const salesByRegionData = [
    { name: 'North America', value: 400 },
    { name: 'Europe', value: 300 },
    { name: 'Asia', value: 200 },
    { name: 'Other', value: 100 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


export default function AnalyticsPage() {
  return (
    <div className="grid gap-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">₹3,145,231</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">New Customers</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+122</div>
                    <p className="text-xs text-muted-foreground">+19% from last month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+2350</div>
                    <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">5.4%</div>
                    <p className="text-xs text-muted-foreground">+1.2% from last month</p>
                </CardContent>
            </Card>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Revenue Over Time</CardTitle>
                    <CardDescription>Monthly revenue for the last 6 months.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="min-h-[300px]">
                        <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis tickFormatter={(value) => `₹${value / 1000}K`} />
                            <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                            <Line type="monotone" dataKey="revenue" stroke={chartConfig.revenue.color} strokeWidth={2} />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card>
                 <CardHeader>
                    <CardTitle>Sales by Region</CardTitle>
                    <CardDescription>Breakdown of sales across different regions.</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                   <ChartContainer config={{}} className="min-h-[300px]">
                    <PieChart>
                        <Pie
                        data={salesByRegionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                        {salesByRegionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}
