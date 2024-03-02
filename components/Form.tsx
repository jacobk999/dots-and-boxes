import type { ComponentProps } from "react";
import { ZodSchema } from "zod";

export type FormProps<T> = Omit<ComponentProps<"form">, "onSubmit"> & {
  onSubmit?: (values: T) => void;
  schema: ZodSchema<T>;
};

export function Form<T>({ schema, ...props }: FormProps<T>) {
  return (
    <form
      {...props}
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const values = Object.fromEntries(formData.entries());
        const safeValues = schema.parse(values);
        props.onSubmit?.(safeValues);
      }}
      className="fixed left-1/2 top-1/2 flex w-11/12 translate-x-[-50%] translate-y-[-50%] flex-col gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-8 shadow-2xl shadow-slate-300/80"
    />
  );
}
