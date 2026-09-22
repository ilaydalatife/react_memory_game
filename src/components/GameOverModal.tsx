import {
  formatTime,
} from "@/utils/gameUtils";

import type {
  GameResult,
} from "@/types/game";


interface GameOverModalProps {
  result: GameResult;

  onRestart: () => void;

  onHome: () => void;
}


function GameOverModal({
  result,
  onRestart,
  onHome,
}: GameOverModalProps) {
  return (
    <div
      className="
        fixed
        inset-0
        z-50
        grid
        place-items-center
        bg-slate-950/65
        p-5
        backdrop-blur-md
      "
    >
      <section
        role="dialog"

        aria-modal="true"

        aria-labelledby="game-over-title"

        className="
          w-full
          max-w-md
          rounded-3xl
          bg-white
          p-8
          text-center
          shadow-2xl
        "
      >
        <div
          className="
            mx-auto
            mb-5
            grid
            aspect-square
            w-16
            place-items-center
            rounded-2xl
            bg-teal-50
            text-3xl
          "
        >
          🏆
        </div>


        <p
          className="
            mb-2
            text-xs
            font-extrabold
            uppercase
            tracking-[0.18em]
            text-teal-600
          "
        >
          Oyun tamamlandı
        </p>


        <h2
          id="game-over-title"

          className="
            text-3xl
            font-black
            text-slate-800
          "
        >
          Tebrikler!
        </h2>


        <p
          className="
            mt-2
            text-slate-500
          "
        >
          Bütün kartların eşini buldun.
        </p>


        <div
          className="
            my-6
            grid
            grid-cols-2
            gap-3
          "
        >

          <div
            className="
              rounded-2xl
              bg-slate-100
              p-4
            "
          >
            <span
              className="
                block
                text-sm
                text-slate-500
              "
            >
              Süre
            </span>

            <strong
              className="
                mt-1
                block
                text-xl
                text-slate-800
              "
            >
              {formatTime(
                result.seconds,
              )}
            </strong>
          </div>


          <div
            className="
              rounded-2xl
              bg-slate-100
              p-4
            "
          >
            <span
              className="
                block
                text-sm
                text-slate-500
              "
            >
              Hamle
            </span>

            <strong
              className="
                mt-1
                block
                text-xl
                text-slate-800
              "
            >
              {result.moves}
            </strong>
          </div>

        </div>


        <div
          className="
            flex
            flex-col
            gap-3
            sm:flex-row
            sm:justify-center
          "
        >
          <button
            type="button"

            onClick={
              onRestart
            }

            className="
              rounded-xl
              bg-gradient-to-r
              from-teal-400
              to-teal-600
              px-5
              py-3
              font-bold
              text-white
              shadow-lg
              shadow-teal-500/20
              transition
              hover:-translate-y-0.5
            "
          >
            Yeni Oyun
          </button>


          <button
            type="button"

            onClick={
              onHome
            }

            className="
              rounded-xl
              bg-slate-100
              px-5
              py-3
              font-bold
              text-slate-700
              transition
              hover:bg-slate-200
            "
          >
            Ana Sayfaya Dön
          </button>
        </div>

      </section>
    </div>
  );
}


export default GameOverModal;