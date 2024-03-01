import type { ComponentProps } from "react";

export function Form(props: ComponentProps<"form">) {
  return (
    <form
      {...props}
      className="flex flex-col gap-4 p-8 fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full md:w-4/5 bg-slate-50 border border-slate-100 rounded-3xl shadow-2xl shadow-slate-300/80"
    />
  );
}
