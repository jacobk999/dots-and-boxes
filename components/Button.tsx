import type { ComponentProps } from "react";

export function Button(props: ComponentProps<"button">) {
  return (
    <button
      {...props}
      className="bg-emerald-400 border border-emerald-500 text-white font-bold p-4 rounded-xl outline-none shadow-md shadow-emerald-300/50 hover:shadow-emerald-300/80 hover:bg-emerald-500 transition-all"
    />
  );
}
