import {
  useNavigate,
} from "react-router-dom";

import Button
  from "@/components/ui/Button";

import GameTimer
  from "@/components/GameTimer";

import {
  useGame,
} from "@/hooks/useGame";


function GameHeader() {
  const navigate =
    useNavigate();


  const {
    config,
    resetGame,
  } = useGame();


  return (
    <header
      className="
        sticky
        top-3
        z-50

        mb-3
        shrink-0

        grid
        grid-cols-1
        items-center
        gap-3

        rounded-[1.75rem]

        border
        border-slate-200/80

        bg-white/95

        px-5
        py-3

        shadow-lg
        shadow-slate-200/50

        backdrop-blur-xl

        md:grid-cols-[1fr_auto_auto]
        md:px-6
      "
    >

      <div
        className="
          text-center
          md:text-left
        "
      >

        <p
          className="
            mb-1
            text-xs
            font-bold
            uppercase
            tracking-[0.18em]
            text-teal-600
          "
        >
          {
            config.label
          } seviye
        </p>


        <h1
          className="
            text-2xl
            font-black
            tracking-tight
            text-slate-900
          "
        >
          Matching Game
        </h1>

      </div>


      <GameTimer />


      <div
        className="
          flex
          justify-center
          gap-2
        "
      >

        <Button
          variant="secondary"

          onClick={() =>
            navigate("/")
          }
        >
          Ana Sayfa
        </Button>


        <Button
          onClick={
            resetGame
          }
        >
          Yeni Oyun
        </Button>

      </div>

    </header>
  );
}


export default GameHeader;