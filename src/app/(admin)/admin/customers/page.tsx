

'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { File, MoreHorizontal, PlusCircle, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const mockCustomers = [
  {
    id: "CUST-001",
    name: "Liam Johnson",
    email: "liam@example.com",
    avatar: "https://i.pravatar.cc/150?u=liamjohnson",
    company: "Innovate Inc.",
    registered: "2023-06-23",
    totalSpent: "₹12,500.00",
  },
  {
    id: "CUST-002",
    name: "Olivia Smith",
    email: "olivia@example.com",
    avatar: "https://i.pravatar.cc/150?u=oliviasmith",
    company: "Solutions Corp.",
    registered: "2023-06-24",
    totalSpent: "₹8,750.00",
  },
  {
    id: "CUST-003",
    name: "Noah Williams",
    email: "noah@example.com",
    avatar: "https://i.pravatar.cc/150?u=noahwilliams",
    company: "Future Enterprises",
    registered: "2023-06-25",
    totalSpent: "₹15,200.00",
  },
  {
    id: "CUST-004",
    name: "Emma Brown",
    email: "emma@example.com",
    avatar: "https://i.pravatar.cc/150?u=emmabrown",
    company: "Synergy Ltd.",
    registered: "2023-06-26",
    totalSpent: "₹21,500.00",
  },
  {
    id: "CUST-005",
    name: "Ava Jones",
    email: "ava@example.com",
    avatar: "https://i.pravatar.cc/150?u=avajones",
    company: "Creative Dynamics",
    registered: "2023-06-27",
    totalSpent: "₹5,500.00",
  },
];

export default function CustomersPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
            <div>
                <CardTitle>Customers</CardTitle>
                <CardDescription>
                  Manage your customer base and view their details.
                </CardDescription>
            </div>
             <div className="flex items-center gap-2">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search customers..." className="pl-8" />
                </div>
                <Button size="sm" variant="outline" className="h-9 gap-1">
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                    </span>
                </Button>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden sm:table-cell">Company</TableHead>
              <TableHead className="hidden md:table-cell">Registered</TableHead>
              <TableHead className="text-right">Total Spent</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={customer.avatar} alt={customer.name} />
                      <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {customer.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{customer.company}</TableCell>
                <TableCell className="hidden md:table-cell">{customer.registered}</TableCell>
                <TableCell className="text-right">{customer.totalSpent}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>View Orders</DropdownMenuItem>
                      <DropdownMenuItem>Disable Account</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-5</strong> of <strong>5</strong> customers
        </div>
      </CardFooter>
    </Card>
  )
}
