import {
  useEffect,
  useState,
} from "react";

import {
  formatTime,
} from "@/utils/gameUtils";


interface GameTimerProps {
  isRunning: boolean;

  onTick: (
    seconds: number,
  ) => void;
}


function GameTimer({
  isRunning,
  onTick,
}: GameTimerProps) {
  /*
    ==================================================
    COMPONENT KENDİ STATE'İNİ YÖNETİYOR
    ==================================================

    seconds artık:

    GamePage içerisinde DEĞİL.

    GameTimer kendi seconds state'ini
    kendi yönetiyor.
  */
  const [
    seconds,
    setSeconds,
  ] = useState<number>(0);


  useEffect(() => {
    /*
      Oyun başlamadıysa
      interval oluşturmayız.
    */
    if (!isRunning) {
      return undefined;
    }


    const intervalId =
      window.setInterval(
        () => {
          setSeconds(
            (
              currentSeconds,
            ) => {
              const nextSeconds =
                currentSeconds + 1;


              /*
                Parent sadece son saniye değerini öğreniyor.

                Timer state'inin sahibi yine GameTimer.
              */
              onTick(
                nextSeconds,
              );


              return nextSeconds;
            },
          );
        },
        1000,
      );


    return () => {
      window.clearInterval(
        intervalId,
      );
    };
  }, [
    isRunning,
    onTick,
  ]);


  return (
    <div
      className="
        min-w-24
        rounded-2xl
        bg-slate-100
        px-4
        py-2
        text-center
      "
    >
      <span
        className="
          block
          text-xs
          font-bold
          uppercase
          tracking-wider
          text-slate-500
        "
      >
        Süre
      </span>

      <strong
        className="
          mt-1
          block
          text-lg
          text-slate-800
        "
      >
        {formatTime(seconds)}
      </strong>
    </div>
  );
}


export default GameTimer;