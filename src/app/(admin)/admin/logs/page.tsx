

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
import { File, Search } from "lucide-react"
import { Input } from "@/components/ui/input";

const mockLogs = [
  {
    id: "LOG-001",
    user: "admin@example.com",
    action: "Updated order ORD-003 status to Fulfilled",
    type: "UPDATE",
    timestamp: "2023-07-25 10:30:15",
  },
  {
    id: "LOG-002",
    user: "employee@example.com",
    action: "Reviewed and approved Gerber files for ORD-004",
    type: "APPROVE",
    timestamp: "2023-07-25 09:45:00",
  },
  {
    id: "LOG-003",
    user: "support@example.com",
    action: "Initiated refund for order ORD-005",
    type: "REFUND",
    timestamp: "2023-07-24 14:20:05",
  },
    {
    id: "LOG-004",
    user: "superadmin@example.com",
    action: "Deleted user account for 'olduser@example.com'",
    type: "DELETE",
    timestamp: "2023-07-24 11:05:30",
  },
   {
    id: "LOG-005",
    user: "system",
    action: "Payment failed for invoice INV-2023-012",
    type: "ERROR",
    timestamp: "2023-07-23 18:00:00",
  },
];


const getActionBadgeVariant = (type: string) => {
  switch (type) {
    case "UPDATE": return "default";
    case "CREATE": return "default";
    case "APPROVE": return "secondary";
    case "DELETE": return "destructive";
    case "REFUND": return "destructive";
    case "ERROR": return "destructive";
    default: return "outline";
  }
}

export default function SystemLogsPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
            <div>
                <CardTitle>System Logs</CardTitle>
                <CardDescription>
                  Monitor all system activities and actions performed by users.
                </CardDescription>
            </div>
             <div className="flex items-center gap-2">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search logs..." className="pl-8" />
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
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
               <TableHead className="hidden sm:table-cell">Type</TableHead>
              <TableHead className="text-right">Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>
                  <div className="font-medium">{log.user}</div>
                </TableCell>
                <TableCell>{log.action}</TableCell>
                 <TableCell className="hidden sm:table-cell">
                    <Badge variant={getActionBadgeVariant(log.type)}>{log.type}</Badge>
                 </TableCell>
                <TableCell className="text-right">{log.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-5</strong> of <strong>5</strong> log entries
        </div>
      </CardFooter>
    </Card>
  )
}
