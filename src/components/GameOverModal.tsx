import {
  useNavigate,
} from "react-router-dom";

import Button
  from "@/components/ui/Button";

import {
  useGame,
} from "@/hooks/useGame";

import {
  formatTime,
} from "@/utils/gameUtils";


function GameOverModal() {
  const navigate =
    useNavigate();


  const {
    state,
    resetGame,
  } = useGame();


  return (
    <div
      className="
        fixed
        inset-0
        z-[100]

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
              {
                formatTime(
                  state.seconds,
                )
              }
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
              {
                state.moves
              }
            </strong>
          </div>

        </div>


        <div
          className="
            flex
            justify-center
            gap-3
          "
        >

          <Button
            onClick={
              resetGame
            }
          >
            Yeni Oyun
          </Button>


          <Button
            variant="secondary"

            onClick={() =>
              navigate("/")
            }
          >
            Ana Sayfa
          </Button>

        </div>

      </section>

    </div>
  );
}


export default GameOverModal;