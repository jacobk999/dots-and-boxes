import type { ComponentProps } from "react";

export function Label(props: ComponentProps<"label">) {
  return (
    <label
      className="text-sm text-slate-600 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none"
      {...props}
    />
  );
}
