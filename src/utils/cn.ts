// Burada clsx + tailwind-merge birlikte kullanılıyor.
// Bu bizim cn() utility fonksiyonumuz.

import{
    clsx,
    type ClassValue,
}from "clsx";

import{
    twMerge,
} from "tailwind-merge";

export function cn(
    ...inputs: ClassValue[]
): string{
    /*
    clsx:
    şartlı class oluşturur.

    tailwind-merge:
    çakışan Tailwind class'larını temizler.
  */

    return twMerge(
        clsx(inputs),
    )
}