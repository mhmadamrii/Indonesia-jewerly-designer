import { createFileRoute } from "@tanstack/react-router";
import { InvoiceTable } from "./-components/invoice-table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export const Route = createFileRoute("/(main)/~/general/invoices/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-[calc(100vh-100px)] w-full flex-col gap-5 px-5 py-5">
      <div className="flex w-full justify-end">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Table" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dark">Invoice</SelectItem>
            <SelectItem value="light">Order</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <InvoiceTable />
    </div>
  );
}
