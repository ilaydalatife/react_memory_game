import GameTimer from "@/components/GameTimer";


interface GameHeaderProps {
  difficultyLabel: string;

  isTimerRunning: boolean;

  timerKey: number;

  onTimeChange: (
    seconds: number,
  ) => void;

  onRestart: () => void;

  onHome: () => void;
}


function GameHeader({
  difficultyLabel,
  isTimerRunning,
  timerKey,
  onTimeChange,
  onRestart,
  onHome,
}: GameHeaderProps) {
  return (
    <header
      /*
        sticky:
        Sayfa scroll edildiğinde header ekranın
        üst kısmında kalır.

        top-4:
        Ekranın üstünden 16px boşluk bırakır.

        z-50:
        Kartların header'ın üzerine çıkmasını engeller.
      */
      className="
        sticky
        top-4
        z-50

        mb-6
        grid
        grid-cols-1
        items-center
        gap-5

        rounded-[1.75rem]

        border
        border-slate-200/80

        bg-white/95

        px-5
        py-4

        shadow-lg
        shadow-slate-200/50

        backdrop-blur-xl

        md:grid-cols-[1fr_auto_auto]
        md:px-6
      "
    >

      {/* SOL TARAF: LEVEL + BAŞLIK */}
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
          {difficultyLabel} seviye
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


      {/* ORTA: TIMER */}
      <div
        className="
          flex
          justify-center
        "
      >
        <GameTimer
          /*
            Yeni oyun başladığında key değişir.

            Böylece GameTimer yeniden oluşturulur
            ve kendi seconds state'i sıfırlanır.
          */
          key={timerKey}

          isRunning={
            isTimerRunning
          }

          onTick={
            onTimeChange
          }
        />
      </div>


      {/* SAĞ: BUTONLAR */}
      <div
        className="
          flex
          flex-col
          justify-center
          gap-2

          sm:flex-row
        "
      >
        <button
          type="button"

          onClick={
            onHome
          }

          className="
            rounded-xl

            bg-slate-100

            px-4
            py-3

            font-bold
            text-slate-700

            transition-all
            duration-200

            hover:-translate-y-0.5
            hover:bg-slate-200
          "
        >
          Ana Sayfa
        </button>


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

            px-4
            py-3

            font-bold
            text-white

            shadow-lg
            shadow-teal-500/20

            transition-all
            duration-200

            hover:-translate-y-0.5
            hover:shadow-xl
          "
        >
          Yeni Oyun
        </button>
      </div>

    </header>
  );
}


export default GameHeader;