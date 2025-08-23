
'use client';

import Image from "next/image"
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
import { File, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react"

const mockProducts = [
  {
    id: "PROD-001",
    name: "IoT Weather Station v2",
    image: "https://placehold.co/64x64.png?text=PCB1",
    status: "Active",
    orders: 120,
    createdAt: "2023-10-18",
  },
  {
    id: "PROD-002",
    name: "Audio Amplifier Board Rev B",
    image: "https://placehold.co/64x64.png?text=PCB2",
    status: "Active",
    orders: 75,
    createdAt: "2023-09-01",
  },
  {
    id: "PROD-003",
    name: "LED Matrix Controller",
    image: "https://placehold.co/64x64.png?text=PCB3",
    status: "Archived",
    orders: 210,
    createdAt: "2023-08-15",
  },
    {
    id: "PROD-004",
    name: "RP2040 Microcontroller Board",
    image: "https://placehold.co/64x64.png?text=PCB4",
    status: "Active",
    orders: 35,
    createdAt: "2023-11-01",
  },
    {
    id: "PROD-005",
    name: "High-Power Motor Driver",
    image: "https://placehold.co/64x64.png?text=PCB5",
    status: "Draft",
    orders: 0,
    createdAt: "2023-11-05",
  },
];


const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "Active":
      return "default";
    case "Draft":
      return "secondary";
    case "Archived":
      return "destructive";
    default:
      return "outline";
  }
}

export default function ProductsPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
            <div>
                <CardTitle>Products</CardTitle>
                <CardDescription>
                  Manage your custom PCB designs and view their order history.
                </CardDescription>
            </div>
            <div className="flex items-center gap-2">
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
                    <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                        Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                 <Button size="sm" variant="outline" className="h-9 gap-1">
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-rap">
                    Export
                    </span>
                </Button>
                 <Button size="sm" className="h-9 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Product
                    </span>
                </Button>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Total Orders</TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Image
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={product.image}
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(product.status)}>{product.status}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{product.orders}</TableCell>
                <TableCell className="hidden md:table-cell">{product.createdAt}</TableCell>
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
                      <DropdownMenuItem>Archive Product</DropdownMenuItem>
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
          Showing <strong>1-5</strong> of <strong>5</strong> products
        </div>
      </CardFooter>
    </Card>
  )
}
