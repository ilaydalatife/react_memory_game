import {
  useEffect,
} from "react";

import {
  useGame,
} from "@/hooks/useGame";

import {
  formatTime,
} from "@/utils/gameUtils";


function GameTimer() {
  const {
    state,
    dispatch,
  } = useGame();


  useEffect(() => {
    if (
      state.phase !==
      "playing"
    ) {
      return undefined;
    }


    const intervalId =
      window.setInterval(
        () => {
          dispatch({
            type:
              "TIMER_TICK",
          });
        },
        1000,
      );


    return () =>
      window.clearInterval(
        intervalId,
      );
  }, [
    state.phase,
    dispatch,
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
        {
          formatTime(
            state.seconds,
          )
        }
      </strong>

    </div>
  );
}


export default GameTimer;