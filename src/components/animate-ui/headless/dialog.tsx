"use client";

import {
  CloseButton,
  DialogBackdrop as DialogBackdropPrimitive,
  Description as DialogDescriptionPrimitive,
  DialogPanel as DialogPanelPrimitive,
  Dialog as DialogPrimitive,
  DialogTitle as DialogTitlePrimitive,
  type DialogBackdropProps as DialogBackdropPrimitiveProps,
  type DialogPanelProps as DialogPanelPrimitiveProps,
  type DialogProps as DialogPrimitiveProps,
  type DialogTitleProps as DialogTitlePrimitiveProps,
} from "@headlessui/react";
import {
  AnimatePresence,
  motion,
  type HTMLMotionProps,
  type Transition,
} from "motion/react";
import * as React from "react";

import { X } from "lucide-react";
import { cn } from "~/lib/utils";

type DialogProps<TTag extends React.ElementType = "div"> = Omit<
  DialogPrimitiveProps<TTag>,
  "static"
> & {
  className?: string;
  as?: TTag;
};

function Dialog<TTag extends React.ElementType = "div">({
  className,
  ...props
}: DialogProps<TTag>) {
  return (
    <AnimatePresence>
      {props?.open && (
        <DialogPrimitive
          data-slot="dialog"
          className={cn("relative z-50", className)}
          {...props}
          static
        />
      )}
    </AnimatePresence>
  );
}

type DialogBackdropProps<TTag extends React.ElementType = typeof motion.div> =
  DialogBackdropPrimitiveProps<TTag> & {
    className?: string;
    as?: TTag;
  };

function DialogBackdrop<TTag extends React.ElementType = typeof motion.div>(
  props: DialogBackdropProps<TTag>,
) {
  const { className, as = motion.div, ...rest } = props;

  return (
    <DialogBackdropPrimitive
      key="dialog-backdrop"
      data-slot="dialog-backdrop"
      className={cn("fixed inset-0 z-50 bg-black/10", className)}
      as={as as React.ElementType}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      {...rest}
    />
  );
}

type FlipDirection = "top" | "bottom" | "left" | "right";

type DialogPanelProps<TTag extends React.ElementType = typeof motion.div> = Omit<
  DialogPanelPrimitiveProps<typeof motion.div>,
  "transition"
> &
  Omit<HTMLMotionProps<"div">, "children"> & {
    from?: FlipDirection;
    transition?: Transition;
    as?: TTag;
  };

function DialogPanel<TTag extends React.ElementType = typeof motion.div>(
  props: DialogPanelProps<TTag>,
) {
  const {
    children,
    className,
    as = motion.div,
    from = "top",
    transition = { type: "spring", stiffness: 150, damping: 25 },
    ...rest
  } = props;

  const initialRotation = from === "top" || from === "left" ? "20deg" : "-20deg";
  const isVertical = from === "top" || from === "bottom";
  const rotateAxis = isVertical ? "rotateX" : "rotateY";

  return (
    <DialogPanelPrimitive
      key="dialog-panel"
      data-slot="dialog-panel"
      className={cn(
        "bg-background fixed top-[50%] left-[50%] z-50 grid w-[calc(100%-2rem)] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-xl border p-6 shadow-lg",
        className,
      )}
      as={as as React.ElementType}
      initial={{
        opacity: 0,
        filter: "blur(4px)",
        transform: `perspective(500px) ${rotateAxis}(${initialRotation}) scale(0.8)`,
        transition,
      }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
        transform: `perspective(500px) ${rotateAxis}(0deg) scale(1)`,
        transition,
      }}
      exit={{
        opacity: 0,
        filter: "blur(4px)",
        transform: `perspective(500px) ${rotateAxis}(${initialRotation}) scale(0.8)`,
        transition,
      }}
      {...rest}
    >
      {(bag) => (
        <>
          {typeof children === "function" ? children(bag) : children}

          <CloseButton
            data-slot="dialog-panel-close"
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </CloseButton>
        </>
      )}
    </DialogPanelPrimitive>
  );
}

type DialogHeaderProps<TTag extends React.ElementType = "div"> =
  React.ComponentProps<TTag> & {
    as?: TTag;
  };

function DialogHeader<TTag extends React.ElementType = "div">({
  className,
  as: Component = "div",
  ...props
}: DialogHeaderProps<TTag>) {
  return (
    <Component
      data-slot="dialog-header"
      className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
      {...props}
    />
  );
}

type DialogFooterProps<TTag extends React.ElementType = "div"> =
  React.ComponentProps<TTag> & {
    as?: TTag;
  };

function DialogFooter({ className, as: Component = "div", ...props }: DialogFooterProps) {
  return (
    <Component
      data-slot="dialog-footer"
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  );
}

type DialogTitleProps<TTag extends React.ElementType = "h2"> =
  DialogTitlePrimitiveProps<TTag> & {
    className?: string;
    as?: TTag;
  };

function DialogTitle<TTag extends React.ElementType = "h2">({
  className,
  ...props
}: DialogTitleProps<TTag>) {
  return (
    <DialogTitlePrimitive
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold tracking-tight", className)}
      {...props}
    />
  );
}

type DialogDescriptionProps<TTag extends React.ElementType = "div"> =
  React.ComponentProps<typeof DialogDescriptionPrimitive<TTag>> & {
    className?: string;
    as?: TTag;
  };

function DialogDescription<TTag extends React.ElementType = "div">({
  className,
  ...props
}: DialogDescriptionProps<TTag>) {
  return (
    <DialogDescriptionPrimitive
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogBackdrop,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogTitle,
  type DialogBackdropProps,
  type DialogDescriptionProps,
  type DialogFooterProps,
  type DialogHeaderProps,
  type DialogPanelProps,
  type DialogProps,
  type DialogTitleProps,
};
