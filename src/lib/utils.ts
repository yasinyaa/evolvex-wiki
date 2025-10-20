import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function userInitials(name: string): string {
  if (!name) return '' 
  return name.split(/\s+/).filter(Boolean).map(word => word.charAt(0).toUpperCase()).join("")
}