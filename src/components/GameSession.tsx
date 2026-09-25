import Countdown
  from "@/components/Countdown";

import GameBoard
  from "@/components/GameBoard";

import GameHeader
  from "@/components/GameHeader";

import GameOverModal
  from "@/components/GameOverModal";

import {
  useGame,
} from "@/hooks/useGame";


function GameSession() {
  const {
    state,
  } = useGame();


  return (
    /*
      ==================================================
      SCROLL KAPATILDI
      ==================================================

      h-dvh:
      ekran yüksekliği

      overflow-hidden:
      oyun ekranında page scroll oluşmasını engeller

      overscroll-none:
      mobil cihazlardaki overscroll davranışını da kapatır
    */
    <main
      className="
        h-dvh
        overflow-hidden
        overscroll-none

        bg-gradient-to-br
        from-slate-50
        via-white
        to-violet-50

        px-3
        py-3

        text-slate-900

        md:px-6
        md:py-4
      "
    >

      <div
        className="
          mx-auto

          flex
          h-full
          w-full
          max-w-5xl

          flex-col
        "
      >

        <GameHeader />


        <section
          className="
            relative
            min-h-0
            flex-1
          "
        >

          <GameBoard />


          {
            state.phase ===
              "countdown" && (
              <Countdown />
            )
          }

        </section>

      </div>


      {
        state.phase ===
          "finished" && (
          <GameOverModal />
        )
      }

    </main>
  );
}


export default GameSession;