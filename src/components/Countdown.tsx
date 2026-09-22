import {
  useEffect,
  useState,
} from "react";


interface CountdownProps {
  onComplete: () => void;
}


function Countdown({
  onComplete,
}: CountdownProps) {
  /*
    ==================================================
    COMPONENT KENDİ STATE'İNİ YÖNETİYOR
    ==================================================

    Önce:

    countdown state'i GamePage içindeydi.

    Şimdi:

    Countdown componenti kendi count state'inin sahibi.
  */
  const [
    count,
    setCount,
  ] = useState<number>(3);


  useEffect(() => {
    /*
      3
      2
      1

      şeklinde ilerliyoruz.
    */
    if (count > 0) {
      const timerId =
        window.setTimeout(
          () => {
            setCount(
              (
                currentCount,
              ) =>
                currentCount - 1,
            );
          },
          1000,
        );


      return () => {
        window.clearTimeout(
          timerId,
        );
      };
    }


    /*
      Sayaç 0 olduğunda:

      BAŞLA!

      kısa süre gösterilir.
    */
    const startTimerId =
      window.setTimeout(
        () => {
          onComplete();
        },
        650,
      );


    return () => {
      window.clearTimeout(
        startTimerId,
      );
    };
  }, [
    count,
    onComplete,
  ]);


  return (
    <div
      role="status"

      aria-live="polite"

      className="
        absolute
        inset-0
        z-30
        grid
        place-items-center
        rounded-3xl
        bg-slate-900/50
        backdrop-blur-sm
      "
    >
      <div
        /*
          Tailwind animate-pulse kullanıyoruz.

          Ek CSS animation yazmamıza gerek yok.
        */
        className="
          grid
          aspect-square
          w-36
          place-items-center
          rounded-full
          border-4
          border-white/80
          bg-teal-500/90
          text-5xl
          font-black
          text-white
          shadow-2xl
          animate-pulse
          sm:w-44
        "
      >
        {
          count > 0
            ? count
            : "BAŞLA!"
        }
      </div>
    </div>
  );
}


export default Countdown;