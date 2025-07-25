import { createFileRoute } from "@tanstack/react-router";
import { ChartAreaInteractive } from "./-components/chart-area-interactive";
import { DataTable } from "./-components/data-table";
import { SectionCards } from "./-components/section-cards";
import { data_tables } from "./data";

export const Route = createFileRoute("/(main)/~/artist/dashboard/")({
  ssr: false,
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <DataTable data={data_tables} />
        </div>
      </div>
    </div>
  );
}
