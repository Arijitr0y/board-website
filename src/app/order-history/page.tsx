
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Header } from '@/components/pcb-flow/header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const mockOrders = [
  {
    id: "ORD-001",
    status: "Fulfilled",
    date: "2023-06-23",
    total: "₹2,500.00",
    items: "IoT Weather Station v2 (x10)"
  },
  {
    id: "ORD-003",
    status: "Fulfilled",
    date: "2023-06-25",
    total: "₹3,500.00",
    items: "Audio Amplifier Board Rev B (x5)"
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

export default async function OrderHistoryPage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }
  
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900/50 p-4 sm:p-6 md:p-8">
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Order History</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Your Orders</CardTitle>
                    <CardDescription>View the history of all your past orders.</CardDescription>
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
                            {mockOrders.map((order) => (
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
                        Showing <strong>1-2</strong> of <strong>2</strong> orders
                    </div>
                </CardFooter>
            </Card>
        </div>
      </main>
    </div>
  )
}
