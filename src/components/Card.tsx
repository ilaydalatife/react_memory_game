import {
  cva,
} from "class-variance-authority";

import {
  cn,
} from "@/utils/cn";

import type {
  MemoryCard,
} from "@/types/game";


interface CardProps {
  card: MemoryCard;

  isFlipped: boolean;

  onClick: (
    cardId: string,
  ) => void;

  disabled: boolean;
}


const cardInnerVariants =
  cva(
    `
      absolute
      inset-0

      h-full
      w-full

      rounded-xl

      [transform-style:preserve-3d]

      transition-transform
      duration-500
      ease-in-out
    `,
    {
      variants: {
        flipped: {
          true:
            "[transform:rotateY(180deg)]",

          false:
            "",
        },
      },
    },
  );


const frontFaceVariants =
  cva(
    `
      absolute
      inset-0

      grid
      place-items-center

      rounded-xl

      bg-teal-400

      text-2xl
      text-white

      shadow-md

      [backface-visibility:hidden]
      [transform:rotateY(180deg)]
    `,
    {
      variants: {
        matched: {
          true:
            "ring-4 ring-white/60",

          false:
            "",
        },
      },
    },
  );


function Card({
  card,
  isFlipped,
  onClick,
  disabled,
}: CardProps) {
  return (
    <button
      type="button"

      disabled={
        disabled
      }

      onClick={() =>
        onClick(
          card.id,
        )
      }

      className="
        group
        relative
        aspect-square
        w-full

        rounded-xl

        border-0
        bg-transparent
        p-0

        [perspective:1000px]

        cursor-pointer

        disabled:cursor-not-allowed
      "
    >

      <span
        className={
          cn(
            cardInnerVariants({
              flipped:
                isFlipped,
            }),
          )
        }
      >

        {/* Kapalı yüz */}
        <span
          className="
            absolute
            inset-0

            grid
            place-items-center

            rounded-xl

            bg-slate-700

            text-xl
            font-black
            text-white/20

            shadow-md

            [backface-visibility:hidden]

            group-enabled:hover:ring-4
            group-enabled:hover:ring-white/30
          "
        >
          ?
        </span>


        {/* Açık yüz */}
        <span
          className={
            cn(
              frontFaceVariants({
                matched:
                  card.isMatched,
              }),
            )
          }
        >
          {
            card.symbol
          }
        </span>

      </span>

    </button>
  );
}


export default Card;