import {
  useEffect,
} from "react";

import {
  useGame,
} from "@/hooks/useGame";


function Countdown() {
  const {
    state,
    dispatch,
  } = useGame();


  const {
    countdown,
    phase,
  } = state;


  useEffect(() => {
    if (
      phase !==
      "countdown"
    ) {
      return undefined;
    }


    /*
      3 → 2 → 1 → 0
    */
    if (
      countdown > 0
    ) {
      const timeoutId =
        window.setTimeout(
          () => {
            dispatch({
              type:
                "COUNTDOWN_TICK",
            });
          },
          1000,
        );


      return () =>
        window.clearTimeout(
          timeoutId,
        );
    }


    /*
      0 olduğunda kısa süre
      BAŞLA! göster.
    */
    const startTimeout =
      window.setTimeout(
        () => {
          dispatch({
            type:
              "COUNTDOWN_COMPLETE",
          });
        },
        650,
      );


    return () =>
      window.clearTimeout(
        startTimeout,
      );
  }, [
    countdown,
    phase,
    dispatch,
  ]);


  return (
    <div
      className="
        absolute
        inset-0
        z-40

        grid
        place-items-center

        rounded-3xl

        bg-slate-950/45

        backdrop-blur-sm
      "
    >

      <div
        className="
          grid
          aspect-square
          w-32
          place-items-center

          rounded-full

          border-4
          border-white/80

          bg-teal-500/90

          text-4xl
          font-black
          text-white

          shadow-2xl

          animate-pulse

          sm:w-40
          sm:text-5xl
        "
      >
        {
          countdown > 0
            ? countdown
            : "BAŞLA!"
        }
      </div>

    </div>
  );
}


export default Countdown;