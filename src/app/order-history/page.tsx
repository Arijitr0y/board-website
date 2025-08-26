
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Header } from '@/components/pcb-flow/header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// Mock data for order history
const mockOrders = [
  {
    id: "ORD-001",
    date: "2023-10-15",
    total: "₹3,500.00",
    status: "Delivered",
  },
  {
    id: "ORD-002",
    date: "2023-09-01",
    total: "₹1,250.00",
    status: "Delivered",
  },
  {
    id: "ORD-003",
    date: "2024-01-20",
    total: "₹8,750.00",
    status: "Shipped",
  },
    {
    id: "ORD-004",
    date: "2024-02-10",
    total: "₹21,500.00",
    status: "Processing",
  },
];


const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "Processing":
      return "secondary";
    case "Shipped":
      return "outline";
    case "Delivered":
      return "default";
    default:
      return "default";
  }
}

export default async function OrderHistoryPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
            <CardDescription>
              View your past orders and their status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
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
                    <TableCell>
                        <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
                    </TableCell>
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
                Showing <strong>1-{mockOrders.length}</strong> of <strong>{mockOrders.length}</strong> orders
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
