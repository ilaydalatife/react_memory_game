import {
  Link,
} from "react-router-dom";

import {
  cva,
} from "class-variance-authority";

import {
  cn,
} from "@/utils/cn";

import type {
  DifficultyConfig,
} from "@/types/game";


interface DifficultyCardProps {
  difficulty:
    DifficultyConfig;
}


/*
  ==================================================
  CVA
  ==================================================

  Difficulty seviyesine bağlı görsel stiller
  HomePage içerisinde tutulmuyor.

  Artık ilgili component olan
  DifficultyCard içerisinde bulunuyor.
*/
const cardVariants =
  cva(
    `
      group
      relative
      block
      overflow-hidden

      rounded-[1.75rem]

      border
      border-slate-200

      bg-white

      p-6

      shadow-sm

      cursor-pointer

      transition-all
      duration-300

      hover:-translate-y-1.5
      hover:shadow-2xl
    `,
    {
      variants: {
        tone: {
          easy: `
            hover:border-emerald-300
            hover:shadow-emerald-100/60
          `,

          medium: `
            hover:border-amber-300
            hover:shadow-amber-100/60
          `,

          hard: `
            hover:border-rose-300
            hover:shadow-rose-100/60
          `,
        },
      },
    },
  );


const iconVariants =
  cva(
    `
      grid
      h-14
      w-14
      place-items-center

      rounded-2xl

      text-2xl

      ring-1

      transition-transform
      duration-300

      group-hover:scale-110
    `,
    {
      variants: {
        tone: {
          easy: `
            bg-emerald-50
            ring-emerald-100
          `,

          medium: `
            bg-amber-50
            ring-amber-100
          `,

          hard: `
            bg-rose-50
            ring-rose-100
          `,
        },
      },
    },
  );


function DifficultyCard({
  difficulty,
}: DifficultyCardProps) {
  return (
    <Link
      to={`/game/${difficulty.key}`}

      className={
        cn(
          cardVariants({
            tone:
              difficulty.key,
          }),
        )
      }
    >
      {/* Hover üst çizgisi */}
      <div
        className="
          absolute
          inset-x-0
          top-0
          h-1

          origin-left
          scale-x-0

          bg-gradient-to-r
          from-teal-400
          to-violet-500

          transition-transform
          duration-300

          group-hover:scale-x-100
        "
      />


      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div
          className={
            iconVariants({
              tone:
                difficulty.key,
            })
          }
        >
          {
            difficulty.icon
          }
        </div>


        <span
          className="
            rounded-full
            bg-slate-100
            px-3
            py-1
            text-xs
            font-bold
            text-slate-500
          "
        >
          {
            difficulty.badge
          }
        </span>
      </div>


      <div className="mt-8">

        <h3
          className="
            text-2xl
            font-bold
            tracking-tight
            text-slate-900
          "
        >
          {
            difficulty.label
          }
        </h3>


        <p
          className="
            mt-2
            min-h-12
            text-sm
            leading-6
            text-slate-500
          "
        >
          {
            difficulty.description
          }
        </p>

      </div>


      <div
        className="
          mt-6
          grid
          grid-cols-2
          gap-3
        "
      >

        <div
          className="
            rounded-2xl
            bg-slate-50
            px-4
            py-3
          "
        >
          <span
            className="
              block
              text-xs
              text-slate-400
            "
          >
            Grid
          </span>

          <strong
            className="
              mt-1
              block
              text-slate-700
            "
          >
            {
              difficulty.rows
            }

            {" × "}

            {
              difficulty.columns
            }
          </strong>
        </div>


        <div
          className="
            rounded-2xl
            bg-slate-50
            px-4
            py-3
          "
        >
          <span
            className="
              block
              text-xs
              text-slate-400
            "
          >
            Eş
          </span>

          <strong
            className="
              mt-1
              block
              text-slate-700
            "
          >
            {
              difficulty.pairCount
            } çift
          </strong>
        </div>

      </div>


      <div
        className="
          mt-6
          flex
          items-center
          justify-between

          border-t
          border-slate-100

          pt-5
        "
      >
        <span
          className="
            text-sm
            font-bold
            text-slate-700

            transition-colors

            group-hover:text-teal-600
          "
        >
          Oyunu başlat
        </span>


        <span
          className="
            grid
            h-9
            w-9
            place-items-center

            rounded-full

            bg-slate-100

            text-lg
            text-slate-600

            transition-all
            duration-300

            group-hover:translate-x-1
            group-hover:bg-teal-500
            group-hover:text-white
          "
        >
          →
        </span>
      </div>

    </Link>
  );
}


export default DifficultyCard;