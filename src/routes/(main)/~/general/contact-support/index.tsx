import { createFileRoute } from "@tanstack/react-router";
import { ContactSupport } from "./-components/contact-support";

export const Route = createFileRoute("/(main)/~/general/contact-support/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ContactSupport />;
}
