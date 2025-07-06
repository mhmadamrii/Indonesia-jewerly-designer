import { motion } from "motion/react";
import React, { useEffect, useRef } from "react";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { cn } from "~/lib/utils";

interface Step {
  number: number;
  label: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepNumber: number) => void;
}

interface AnimatedCheckProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
  strokeWidth?: number;
}

const AnimatedCheck: React.FC<AnimatedCheckProps> = ({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <motion.path
        d="M20 6L9 17l-5-5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </svg>
  );
};

const AnimatedStepper: React.FC<StepperProps> = ({ steps, currentStep, onStepClick }) => {
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  const scrollToCurrentStep = (stepIndex: number) => {
    const scrollArea = scrollAreaRef.current;
    if (scrollArea && scrollArea.children.length) {
      const stepElement = scrollArea.children[stepIndex] as HTMLElement;

      if (stepElement) {
        stepElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    }
  };

  useEffect(() => {
    scrollToCurrentStep(currentStep - 1);
  }, [currentStep]);

  return (
    <ScrollArea className="flex w-full justify-center rounded-md whitespace-nowrap">
      <div className="flex items-center justify-center p-4" ref={scrollAreaRef}>
        {steps.map((step, index) => (
          <div key={step.number} className="flex w-full flex-col items-center">
            <div className="flex w-full items-center">
              <div className="flex flex-col items-center justify-center">
                <motion.div
                  onClick={() => onStepClick(step.number)}
                  className={cn(
                    "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-sm font-bold dark:text-white",
                    step.number === currentStep
                      ? "text-primary-foreground bg-[#FF3B30]"
                      : step.number < currentStep
                        ? "text-primary-foreground bg-[#FF3B30]"
                        : "bg-secondary text-secondary-foreground",
                  )}
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    scale: step.number === currentStep ? 1.1 : 1,
                    transition: { duration: 0.3 },
                  }}
                >
                  {step.number < currentStep ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AnimatedCheck className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    step.number
                  )}
                </motion.div>
                <motion.div
                  className={cn(
                    "mt-2 w-20 text-center text-xs",
                    step.number === currentStep
                      ? "font-bold text-black dark:text-white"
                      : "text-black dark:text-white",
                  )}
                  initial={{ opacity: 0.5 }}
                  animate={{
                    opacity: step.number === currentStep ? 1 : 0.5,
                    transition: { duration: 0.3 },
                  }}
                >
                  {step.label}
                </motion.div>
              </div>
              {index < steps.length - 1 && (
                <motion.div
                  className="mb-5 h-[4px] w-full rounded-4xl"
                  initial={{ backgroundColor: "hsl(var(--muted))" }}
                  animate={{
                    backgroundColor:
                      step.number <= currentStep ? "#FF3B30" : "hsl(var(--muted))",
                    transition: { duration: 0.3 },
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export { AnimatedStepper };
