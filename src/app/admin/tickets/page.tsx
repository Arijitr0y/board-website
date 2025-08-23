
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
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { ListFilter, MoreHorizontal, PlusCircle, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const mockTickets = [
  {
    id: "TKT-001",
    subject: "Refund request for ORD-005",
    customer: "Ava Jones",
    status: "Open",
    priority: "High",
    lastUpdate: "2023-07-25",
  },
  {
    id: "TKT-002",
    subject: "Wrong material used for my PCB",
    customer: "Noah Williams",
    status: "In Progress",
    priority: "High",
    lastUpdate: "2023-07-25",
  },
    {
    id: "TKT-003",
    subject: "Shipping address update for ORD-002",
    customer: "Olivia Smith",
    status: "Closed",
    priority: "Medium",
    lastUpdate: "2023-07-24",
  },
    {
    id: "TKT-004",
    subject: "Question about DFM results",
    customer: "Liam Johnson",
    status: "Open",
    priority: "Low",
    lastUpdate: "2023-07-23",
  },
];


const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "Open": return "destructive";
    case "In Progress": return "secondary";
    case "Closed": return "default";
    default: return "outline";
  }
}

const getPriorityBadgeVariant = (priority: string) => {
  switch (priority) {
    case "High": return "destructive";
    case "Medium": return "secondary";
    case "Low": return "outline";
    default: return "outline";
  }
}

export default function TicketsPage() {
  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="closed">Closed</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
           <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search tickets..." className="pl-8" />
            </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by priority</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem>High</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Medium</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Low</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" className="h-9 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Create Ticket
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Support Tickets</CardTitle>
            <CardDescription>
              Manage and resolve customer support tickets.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="hidden md:table-cell">Last Update</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">{ticket.id}</TableCell>
                    <TableCell>
                        <div className="font-medium">{ticket.subject}</div>
                        <div className="text-sm text-muted-foreground">{ticket.customer}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(ticket.status)}>{ticket.status}</Badge>
                    </TableCell>
                     <TableCell>
                      <Badge variant={getPriorityBadgeVariant(ticket.priority)}>{ticket.priority}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {ticket.lastUpdate}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Assign to Agent</DropdownMenuItem>
                          <DropdownMenuItem>Close Ticket</DropdownMenuItem>
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
              Showing <strong>1-4</strong> of <strong>4</strong> tickets
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
