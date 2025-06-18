import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { JewerlyForm } from "~/components/forms/jewerly-form";
import { JewerlyLinkForm } from "~/components/forms/jewerly-link-form";
import { JewerlyPublishForm } from "~/components/forms/jewerly-publish-form";
import { JewerlyUploadForm } from "~/components/forms/jewerly-upload-form";
import { Card } from "~/components/ui/card";
import { AnimatedStepper } from "~/components/ui/stepper";
import { getAllCategories } from "~/lib/actions/jewerly.action";

export const Route = createFileRoute("/(main)/publishing")({
  component: RouteComponent,
  loader: async () => {
    const categories = await getAllCategories();
    console.log("categories", categories);
    return { jewerly_categories: categories.data };
  },
});

const steps = [
  {
    number: 1,
    label: "Asset",
  },
  {
    number: 2,
    label: "Upload",
  },
  {
    number: 3,
    label: "Links",
  },
  {
    number: 4,
    label: "Publish",
  },
];

function RouteComponent() {
  const { jewerly_categories } = Route.useLoaderData();
  console.log("categories", jewerly_categories);
  const [currentStep, setCurrentStep] = useState(1);

  const handleStepClick = (stepNumber: number) => {
    setCurrentStep(stepNumber);
  };

  const getFormStepper = () => {
    switch (currentStep) {
      case 1:
        return <JewerlyForm onStepClick={handleStepClick} />;
      case 2:
        return <JewerlyUploadForm onStepClick={handleStepClick} />;
      case 3:
        return <JewerlyLinkForm onStepClick={handleStepClick} />;
      case 4:
        return <JewerlyPublishForm />;
      default:
        break;
    }
  };

  return (
    <section className="flex flex-col gap-5 px-10">
      <h1 className="text-xl font-semibold">Publishing</h1>
      <Card className="flex min-h-[600px] w-full flex-col">
        <div className="w-full">
          <AnimatedStepper
            steps={steps}
            currentStep={currentStep}
            onStepClick={handleStepClick}
          />
        </div>
        {getFormStepper()}
      </Card>
    </section>
  );
}
