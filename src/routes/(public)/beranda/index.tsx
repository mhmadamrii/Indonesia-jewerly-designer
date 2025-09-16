import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";

export const Route = createFileRoute("/(public)/beranda/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <h1>{t("welcome_to_react")}</h1>
      <Button onClick={() => i18n.changeLanguage("fr")}>Français</Button>
      <Button onClick={() => i18n.changeLanguage("en")}>English</Button>
    </div>
  );
}
