import { createFileRoute } from "@tanstack/react-router";
import { HeaderPage } from "~/components/header-page";
import { DraftTable } from "./-components/draft-table";

export const Route = createFileRoute("/(main)/~/artist/drafts/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-3 px-5">
      <HeaderPage
        headerTitle="Drafts & Previews"
        headerSubtitle="Manage your product drafts and previews before publishing"
      />
      <DraftTable />
    </div>
  );
}
