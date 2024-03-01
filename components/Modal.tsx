"use client";

import type { ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

export const Modal = DialogPrimitive.Root;

export function ModalContent({ children }: { children: ReactNode }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md" />
      <DialogPrimitive.Content className="fixed left-1/2 top-1/2  flex translate-x-[-50%] translate-y-[-50%] flex-col items-center gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-6 shadow-2xl shadow-slate-300/80">
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
