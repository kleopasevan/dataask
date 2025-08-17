"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

export const Sheet = DialogPrimitive.Root
export const SheetTrigger = DialogPrimitive.Trigger

export function SheetContent({ children, side = "left", className = "" }: { children: React.ReactNode; side?: "left" | "right"; className?: string }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/40" />
      <DialogPrimitive.Content
        className={`fixed top-0 bottom-0 ${side === "left" ? "left-0" : "right-0"} bg-background border w-80 shadow-lg ${className}`}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}


