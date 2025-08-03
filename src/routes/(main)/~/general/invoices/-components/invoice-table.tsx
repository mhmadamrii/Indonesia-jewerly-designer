import { Eye, MoreHorizontal, Pencil, Send, Trash } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

const invoices = [
  {
    id: "INV-001",
    client: "Acme Corp",
    issueDate: "2025-07-01",
    dueDate: "2025-07-15",
    amount: 1500.0,
    status: "Paid",
  },
  {
    id: "INV-002",
    client: "Beta LLC",
    issueDate: "2025-07-05",
    dueDate: "2025-07-20",
    amount: 2750.5,
    status: "Unpaid",
  },
  {
    id: "INV-003",
    client: "Gamma Inc",
    issueDate: "2025-06-25",
    dueDate: "2025-07-10",
    amount: 3200.75,
    status: "Overdue",
  },
];

const getStatusVariant = (status: string) => {
  switch (status) {
    case "Paid":
      return "success";
    case "Unpaid":
      return "warning";
    case "Overdue":
      return "destructive";
    default:
      return "default";
  }
};

export function InvoiceTable() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="border-b py-2">
          <h2 className="text-2xl font-bold">Invoices</h2>
          <p className="text-sm">Manage your invoices with ease</p>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Invoice #</TableHead>
              <TableHead className="font-semibold">Item Purchased</TableHead>
              <TableHead className="font-semibold">Issue Date</TableHead>
              <TableHead className="font-semibold">Due Date</TableHead>
              <TableHead className="font-semibold">Amount</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id} className="transition-colors">
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{invoice.client}</TableCell>
                <TableCell>{invoice.issueDate}</TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(invoice.status)} className="px-3 py-1">
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Send className="mr-2 h-4 w-4" />
                        Send
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
