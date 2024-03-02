import type { ComponentProps } from "react";

export type ButtonProps = ComponentProps<"button"> & ButtonVariants;

interface ButtonVariants {
  color: "emerald" | "indigo";
  padding?: "sm" | "md" | "lg";
  full?: boolean;
}

const ButtonColor = {
  emerald:
    "bg-emerald-400 border-emerald-500 shadow-emerald-300/50 hover:bg-emerald-500 hover:shadow-emerald-300/80",
  indigo:
    "bg-indigo-400 border-indigo-500 shadow-indigo-300/50 hover:bg-indigo-500 hover:shadow-indigo-300/80",
};

const ButtonPadding = {
  sm: "p-2",
  md: "p-4",
  lg: "p-6",
};

export function Button({ color, padding = "md", full, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`rounded-xl border font-bold text-white shadow-md outline-none transition-all ${full ? "w-full" : ""} ${ButtonColor[color]} ${ButtonPadding[padding]}`}
    />
  );
}
