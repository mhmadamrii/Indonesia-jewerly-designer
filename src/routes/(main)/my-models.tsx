import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { getMyJewerlyAssets } from "~/actions/jewerly.action";
import { TableDemo } from "~/components/table-demo";
import { Card, CardContent } from "~/components/ui/card";

export const Route = createFileRoute("/(main)/my-models")({
  loader: async () => {
    const myAssets = getMyJewerlyAssets();
    return { myAssets };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { myAssets } = Route.useLoaderData();
  return (
    <section className="mx-5 flex flex-col gap-4">
      <div>
        <Card>
          <CardContent>
            <div>Total Content</div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardContent>
          {/* <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <Await
                promise={myAssets}
                fallback={
                  <TableRow>
                    <TableCell>Loading...</TableCell>
                  </TableRow>
                }
              >
                {({ data }) =>
                  data.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>Credit Card</TableCell>
                      <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                  ))
                }
              </Await>
            </TableBody>
          </Table> */}
          <ClientOnly>
            <TableDemo />
          </ClientOnly>
        </CardContent>
      </Card>
    </section>
  );
}
