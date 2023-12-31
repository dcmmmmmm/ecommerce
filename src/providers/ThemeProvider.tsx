"use client"

import * as React from "react"
import { ThemeProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"


export default function ThemeProviders({ children, ...props }: ThemeProviderProps) {
  return (
    <ThemeProvider  {...props}>
      {children}
    </ThemeProvider>
  )
}