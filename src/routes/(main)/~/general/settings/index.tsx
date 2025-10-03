import { createFileRoute } from "@tanstack/react-router";
import { UserSettings } from "./-components/user-settings";

export const Route = createFileRoute("/(main)/~/general/settings/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <UserSettings />;
}

// modal apply designer
const t = {
  display_name: "Nama Tampilan",
  business_name: "CV Permata Desain",
  bio: "Desainer perhiasan custom, fokus emas 18k & lab-grown diamonds.",
  phone: "+62812xxxx",
  country: "ID",
  city: "Jakarta",
  tax_id: "1234567890",
  portfolio: [
    {
      title: "Ring Intan Classic",
      image_url: "s3://...",
      materials: ["18k gold", "diamond"],
      year: 2024,
    },
  ],
  documents: [
    { type: "id_card", file_url: "s3://..." },
    { type: "selfie_with_id", file_url: "s3://..." },
  ],
  payout_info: {
    method: "bank_transfer",
    bank: "BCA",
    account_no: "1234567890",
    account_name: "Nama Pemilik",
  },
  agreements: { terms_accepted: true, fee_structure_ack: true },
};
