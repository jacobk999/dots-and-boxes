"use client";

import { useRef, type ComponentProps } from "react";
import { Label } from "./Label";
import { useController, useFormContext } from "react-hook-form";
import * as Tooltip from "@radix-ui/react-tooltip";

export interface InputProps extends ComponentProps<"input"> {
  name: string;
  label: string;
  type: ComponentProps<"input">["type"];
  placeholder?: string;
}

export function Input(props: InputProps) {
  const isErrored = props.name === "width";
  const error = "Must be between 1 and 8";

  return (
    <div className="group w-full" aria-invalid={isErrored}>
      <Label htmlFor={props.name}>
        <span>{props.label}</span>
        {isErrored && (
          <span className="z-50 ml-2 whitespace-nowrap rounded-full bg-rose-300 px-2 py-1 font-medium leading-none text-white">
            {error}
          </span>
        )}
      </Label>
      <input
        {...props}
        aria-invalid={isErrored}
        className="peer mt-1.5 flex w-full rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-md shadow-slate-200/80 ring-offset-sky-50 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:outline-rose-300"
      />
    </div>
  );
}
