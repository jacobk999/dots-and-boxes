import type { ComponentProps } from "react";

export function Label(props: ComponentProps<"label">) {
  return (
    <label
      className="select-none text-sm font-medium leading-none text-slate-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      {...props}
    />
  );
}
