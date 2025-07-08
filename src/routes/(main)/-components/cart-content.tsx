import { motion, type HTMLMotionProps, type Transition } from "motion/react";
import * as React from "react";

import {
  SlidingNumber,
  type SlidingNumberProps,
} from "~/components/animate-ui/text/sliding-number";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

type CounterProps = HTMLMotionProps<"div"> & {
  number: number;
  setNumber: (number: number) => void;
  slidingNumberProps?: Omit<SlidingNumberProps, "number">;
  buttonProps?: Omit<React.ComponentProps<typeof Button>, "onClick">;
  transition?: Transition;
};

function CartContent({
  number,
  setNumber,
  className,
  slidingNumberProps,
  buttonProps,
  transition = { type: "spring", bounce: 0, stiffness: 300, damping: 30 },
  ...props
}: CounterProps) {
  return (
    <motion.div
      data-slot="counter"
      layout
      transition={transition}
      className={cn(
        "flex items-center gap-x-2 rounded-xl bg-neutral-100 p-1 dark:bg-neutral-800",
        className,
      )}
      {...props}
    >
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          size="icon"
          {...buttonProps}
          onClick={() => setNumber(number - 1)}
          className={cn(
            "bg-white pb-[3px] text-2xl font-light text-neutral-950 hover:bg-white/70 dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-950/70",
            buttonProps?.className,
          )}
        >
          -
        </Button>
      </motion.div>

      <SlidingNumber
        number={number}
        {...slidingNumberProps}
        className={cn("text-lg", slidingNumberProps?.className)}
      />

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          size="icon"
          {...buttonProps}
          onClick={() => setNumber(number + 1)}
          className={cn(
            "bg-white pb-[3px] text-2xl font-light text-neutral-950 hover:bg-white/70 dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-950/70",
            buttonProps?.className,
          )}
        >
          +
        </Button>
      </motion.div>
    </motion.div>
  );
}

export { CartContent, type CounterProps };
