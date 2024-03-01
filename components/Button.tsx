import type { ComponentProps } from "react";

export function Button(props: ComponentProps<"button">) {
  return (
    <button
      {...props}
      className="w-full rounded-xl border border-emerald-500 bg-emerald-400 p-4 font-bold text-white shadow-md shadow-emerald-300/50 outline-none transition-all hover:bg-emerald-500 hover:shadow-emerald-300/80"
    />
  );
}
