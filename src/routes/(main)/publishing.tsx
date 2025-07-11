import { Await, createFileRoute } from "@tanstack/react-router";
import { JSX, useState } from "react";
import { getAllCategories } from "~/actions/category.action";
import { JewerlyForm } from "~/components/forms/jewerly-form";
import { JewerlyLinkForm } from "~/components/forms/jewerly-link-form";
import { JewerlyPublishForm } from "~/components/forms/jewerly-publish-form";
import { JewerlyUploadForm } from "~/components/forms/jewerly-upload-form";
import { JewerlyFormSkeleton } from "~/components/skeletons/jewerly-form-skeleton";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { AnimatedStepper } from "~/components/ui/stepper";
import { useFormStorage } from "~/lib/store";

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
  const { jewerlyForm } = useFormStorage();
  const [currentStep, setCurrentStep] = useState(1);

  const handleStepClick = (stepNumber: number) => {
    const { title, price, currency, category, desc, image_url, type_asset } = jewerlyForm;

    // if (
    //   !title ||
    //   !price ||
    //   !currency ||
    //   !category ||
    //   !desc ||
    //   !image_url ||
    //   !type_asset
    // ) {
    //   toast.error("Please complete the form before proceeding");
    //   return;
    // }

    setCurrentStep(stepNumber);
  };

  const getFormStepper = (): JSX.Element => {
    switch (currentStep) {
      case 1:
        return (
          <Await promise={categories} fallback={<JewerlyFormSkeleton />}>
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
    <section className="flex w-full flex-col gap-5 px-10 py-8">
      <h1 className="text-xl font-semibold">Publishing</h1>
      <div className="flex w-full flex-col gap-4 sm:flex-row">
        <Card className="flex min-h-[600px] w-full flex-col sm:w-[70%]">
          <div className="w-full">
            <AnimatedStepper
              steps={steps}
              currentStep={currentStep}
              onStepClick={handleStepClick}
            />
          </div>
          {getFormStepper()}
        </Card>
        <Card className="sticky top-3 h-[400px] w-full flex-col sm:w-[30%]">
          <CardHeader>Requirements</CardHeader>
          <CardContent>
            <ul className="list-disc pl-5">
              <li>Static image must be a .png</li>
              <li>3D asset must be an .glb</li>
              <li>Max size for .png is 10MB</li>
              <li>Max size for .glb is 40MB</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
