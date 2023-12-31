// app/components/ThemeSwitcher.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {Moon, Sun} from 'lucide-react'
import { Button } from "./ui/button";
import dynamic from "next/dynamic";
export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) {
    return null
  } 
    

  return (
      <Button 
        className={`w-fit p-2 rounded-md hover:scale-110 active:scale duration-200`}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === 'light' ? <Moon className="text-black"/> : <Sun className="text-white"/>}
      </Button>

  )
};