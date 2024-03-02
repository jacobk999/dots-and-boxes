import type { ComponentProps } from "react";

export function Label(props: ComponentProps<"label">) {
  return (
    <label
      className="select-none py-1 text-xs font-bold uppercase leading-none text-slate-500 group-aria-[invalid=true]:text-rose-300"
      {...props}
    />
  );
}
