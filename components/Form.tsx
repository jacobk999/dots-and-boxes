import type { ComponentProps } from "react";

export function Form(props: ComponentProps<"form">) {
  return (
    <form
      {...props}
      className="fixed left-1/2 top-1/2 flex w-4/5 translate-x-[-50%] translate-y-[-50%] flex-col gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-8 shadow-2xl shadow-slate-300/80"
    />
  );
}
