import type {
  ButtonHTMLAttributes,
} from "react";

import {
  cva,
  type VariantProps,
} from "class-variance-authority";

import {
  cn,
} from "@/utils/cn";


const buttonVariants =
  cva(
    `
      inline-flex
      items-center
      justify-center
      rounded-xl
      font-bold
      transition-all
      duration-200

      cursor-pointer

      focus-visible:outline-none
      focus-visible:ring-2
      focus-visible:ring-teal-500
      focus-visible:ring-offset-2

      disabled:pointer-events-none
      disabled:opacity-50
      disabled:cursor-not-allowed
    `,
    {
      variants: {
        variant: {
          primary: `
            bg-gradient-to-r
            from-teal-400
            to-teal-600
            text-white
            shadow-lg
            shadow-teal-500/20

            hover:-translate-y-0.5
            hover:shadow-xl
          `,

          secondary: `
            bg-slate-100
            text-slate-700

            hover:-translate-y-0.5
            hover:bg-slate-200
          `,
        },

        size: {
          sm: `
            px-3
            py-2
            text-sm
          `,

          md: `
            px-4
            py-3
            text-sm
          `,
        },
      },

      defaultVariants: {
        variant:
          "primary",

        size:
          "md",
      },
    },
  );


interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<
      typeof buttonVariants
    > {}


function Button({
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      className={
        cn(
          buttonVariants({
            variant,
            size,
          }),

          className,
        )
      }

      {...props}
    />
  );
}


export default Button;