import { Eye, MoreHorizontal, Pencil, Send, Trash } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { useFormStorage } from "~/lib/store";

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
    status: "Draft",
  },
  {
    id: "INV-002",
    client: "Beta LLC",
    issueDate: "2025-07-05",
    dueDate: "2025-07-20",
    amount: 2750.5,
    status: "Draft",
  },
  {
    id: "INV-003",
    client: "Gamma Inc",
    issueDate: "2025-06-25",
    dueDate: "2025-07-10",
    amount: 3200.75,
    status: "Draft",
  },
];

const getStatusVariant = (status: string) => {
  switch (status) {
    case "Paid":
      return "success";
    case "Unpaid":
      return "warning";
    case "Draft":
      return "destructive";
    default:
      return "default";
  }
};

export function DraftTable() {
  const { drafts, removeDraft } = useFormStorage();
  return (
    <Card className="h-[calc(100vh-250px)] overflow-y-auto">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">No</TableHead>
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Price</TableHead>
              <TableHead className="font-semibold">Category</TableHead>
              <TableHead className="font-semibold">Image Count</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {drafts.length > 0 ? (
              drafts.map((item, idx) => (
                <TableRow key={idx} className="transition-colors">
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell>{JSON.parse(item.formValues).name}</TableCell>
                  <TableCell>{`${JSON.parse(item.formValues).currency} ${JSON.parse(item.formValues).price}`}</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    <Badge variant="destructive" className="px-3 py-1">
                      Draft
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
                        <DropdownMenuItem
                          onClick={() => removeDraft(item.id)}
                          className="text-red-600"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>No drafts found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
