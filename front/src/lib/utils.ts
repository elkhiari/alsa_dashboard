import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parsNumber(value: any, fixed = 2) {
  return (value ?? 0).toFixed(fixed).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const convertDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};
