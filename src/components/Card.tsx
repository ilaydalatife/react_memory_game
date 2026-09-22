import type {
  MemoryCard,
} from "@/types/game";


interface CardProps {
  card: MemoryCard;

  isFlipped: boolean;

  disabled: boolean;

  onClick: (
    cardId: string,
  ) => void;
}


function Card({
  card,
  isFlipped,
  disabled,
  onClick,
}: CardProps) {
  /*
    Card'ın kendine ait bağımsız bir state'i yok.

    Açık/kapalı durumu başka kartla karşılaştırılacağı
    için bunun sahibi GameBoard'dur.
  */

  return (
    <button
      type="button"

      disabled={disabled}

      onClick={() =>
        onClick(card.id)
      }

      aria-label={
        isFlipped
          ? `Açık kart ${card.symbol}`
          : "Kapalı kart"
      }

      /*
        [perspective:1000px]

        Tailwind arbitrary property kullanımıdır.

        Kartın 3D dönüşünde derinlik sağlar.
      */
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
        disabled:cursor-default
      "
    >
      <span
        className={`
          absolute
          inset-0
          h-full
          w-full
          rounded-xl
          [transform-style:preserve-3d]
          transition-transform
          duration-500
          ease-in-out

          ${
            isFlipped
              ? "[transform:rotateY(180deg)]"
              : ""
          }
        `}
      >

        {/* KAPALI YÜZ */}
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


        {/* AÇIK YÜZ */}
        <span
          className={`
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

            ${
              card.isMatched
                ? "ring-4 ring-white/60"
                : ""
            }
          `}
        >
          {card.symbol}
        </span>

      </span>
    </button>
  );
}


export default Card;