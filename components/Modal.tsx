"use client";

import type { ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

export const Modal = DialogPrimitive.Root;

export function ModalContent({ children }: { children: ReactNode }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md" />
      <DialogPrimitive.Content className="fixed top-[50%] left-[50%]  translate-x-[-50%] translate-y-[-50%] bg-slate-100 p-4 rounded-xl">
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
