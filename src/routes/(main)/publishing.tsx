import { Await, createFileRoute } from "@tanstack/react-router";
import { JSX, useState } from "react";
import { getAllCategories } from "~/actions/category.action";
import { JewerlyForm } from "~/components/forms/jewerly-form";
import { JewerlyLinkForm } from "~/components/forms/jewerly-link-form";
import { JewerlyPublishForm } from "~/components/forms/jewerly-publish-form";
import { JewerlyUploadForm } from "~/components/forms/jewerly-upload-form";
import { Card } from "~/components/ui/card";
import { AnimatedStepper } from "~/components/ui/stepper";

export const Route = createFileRoute("/(main)/publishing")({
  component: RouteComponent,
  loader: async () => {
    const categories = getAllCategories();
    return { categories };
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
  const { categories } = Route.useLoaderData();
  const [currentStep, setCurrentStep] = useState(1);

  const handleStepClick = (stepNumber: number) => {
    setCurrentStep(stepNumber);
  };

  const getFormStepper = (): JSX.Element => {
    switch (currentStep) {
      case 1:
        return (
          <Await promise={categories} fallback={<div>Loading...</div>}>
            {({ data }) => (
              <JewerlyForm categories={data} onStepClick={handleStepClick} />
            )}
          </Await>
        );
      case 2:
        return <JewerlyUploadForm onStepClick={handleStepClick} />;
      case 3:
        return <JewerlyLinkForm onStepClick={handleStepClick} />;
      case 4:
        return <JewerlyPublishForm />;
      default:
        return <span>No step</span>;
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
