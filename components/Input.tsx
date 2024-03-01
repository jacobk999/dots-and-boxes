import type { ComponentProps } from "react";

export function Input(props: ComponentProps<"input">) {
  return (
    <input
      {...props}
      className="bg-background ring-offset-background mt-1.5 flex w-full rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-md shadow-slate-200/80 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    />
  );
}
