"use client"

import * as React from "react"
import * as DropdownPrimitive from "@radix-ui/react-dropdown-menu"

export const DropdownMenu = DropdownPrimitive.Root
export const DropdownMenuTrigger = DropdownPrimitive.Trigger

export function DropdownMenuContent({ children, className = "", align = "end" }: { children: React.ReactNode; className?: string; align?: "start" | "end" | "center" }) {
  return (
    <DropdownPrimitive.Portal>
      <DropdownPrimitive.Content className={`min-w-[8rem] rounded-md border bg-background p-1 shadow-md ${className}`} align={align}>
        {children}
      </DropdownPrimitive.Content>
    </DropdownPrimitive.Portal>
  )
}

export function DropdownMenuItem({ children, className = "", onSelect }: { children: React.ReactNode; className?: string; onSelect?: () => void }) {
  return (
    <DropdownPrimitive.Item className={`cursor-pointer select-none rounded-sm px-2 py-1.5 text-sm outline-none ${className}`} onSelect={onSelect}>
      {children}
    </DropdownPrimitive.Item>
  )
}


