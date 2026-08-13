import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility untuk menggabungkan class Tailwind CSS dengan resolusi konflik class otomatis.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
