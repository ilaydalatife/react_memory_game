import {
  useEffect,
} from "react";

import Card
  from "@/components/Card";

import {
  useGame,
} from "@/hooks/useGame";

import {
  cn,
} from "@/utils/cn";

import type {
  MemoryCard,
} from "@/types/game";


interface BlockedCell {
  id: string;

  isBlocked: true;
}


function GameBoard() {
  const {
    state,
    config,
    dispatch,
  } = useGame();


  /*
    İkinci kart seçildiğinde
    sonucu belirli süre sonra uygula.

    Effect içerisinde doğrudan dispatch yok.

    dispatch timeout callback'i içerisinde.
  */
  useEffect(() => {
    if (
      !state.secondChoiceId ||
      !state.pendingPairResult
    ) {
      return undefined;
    }


    const delay =
      state.pendingPairResult ===
      "match"
        ? 500
        : 900;


    const timeoutId =
      window.setTimeout(
        () => {
          dispatch({
            type:
              "RESOLVE_PAIR",
          });
        },
        delay,
      );


    return () =>
      window.clearTimeout(
        timeoutId,
      );
  }, [
    state.secondChoiceId,
    state.pendingPairResult,
    dispatch,
  ]);


  const blockedIndex =
    config.hasBlockedCell
      ? Math.floor(
          (state.cards.length + 1) /
            2,
        )
      : -1;


  const cells:
    Array<
      MemoryCard |
      BlockedCell
    > = [
    ...state.cards,
  ];


  if (
    config.hasBlockedCell
  ) {
    cells.splice(
      blockedIndex,
      0,
      {
        id:
          "blocked-cell",

        isBlocked:
          true,
      },
    );
  }


  const gridVariants:
    Record<
      number,
      string
    > = {
    4:
      "grid-cols-4",

    5:
      "grid-cols-5",

    6:
      "grid-cols-6",
  };


  const gridClass =
    gridVariants[
      config.columns
    ] ??
    "grid-cols-4";


  const handleCardClick = (
    cardId: string,
  ): void => {
    dispatch({
      type:
        "SELECT_CARD",

      payload: {
        cardId,
      },
    });
  };


  return (
    <div
      className="
        flex
        h-full
        min-h-0
        flex-col
        items-center
        justify-center
        gap-2
      "
    >

      {/* Hamle */}
      <div
        className="
          shrink-0
          rounded-2xl
          bg-white
          px-5
          py-2
          text-center
          shadow-sm
        "
      >
        <span
          className="
            block
            text-[11px]
            font-bold
            uppercase
            tracking-wider
            text-slate-400
          "
        >
          Hamle
        </span>

        <strong
          className="
            block
            text-lg
            text-slate-800
          "
        >
          {
            state.moves
          }
        </strong>
      </div>


      {/*
        =================================================
        OYUN EKRANINDA SCROLL YOK
        =================================================

        GameSession h-dvh + overflow-hidden.

        Board yüksekliği viewport'a göre küçülüyor.

        Böylece hard level'da bile
        sayfa scroll olmak zorunda kalmıyor.
      */}
      <div
        className={
          cn(
            `
              grid
              aspect-square

              w-[min(100%,calc(100dvh-12.5rem))]
              max-w-3xl

              gap-2

              rounded-3xl

              bg-gradient-to-br
              from-teal-400
              via-cyan-500
              to-violet-500

              p-3

              shadow-2xl

              sm:gap-3
              sm:p-5

              md:w-[min(100%,calc(100dvh-10rem))]
            `,

            gridClass,
          )
        }
      >

        {
          cells.map(
            (item) => {
              if (
                "isBlocked" in item &&
                item.isBlocked
              ) {
                return (
                  <div
                    key={
                      item.id
                    }

                    className="
                      grid
                      aspect-square
                      place-items-center

                      rounded-xl

                      border-2
                      border-dashed
                      border-white/50

                      bg-white/10

                      text-xl
                      text-white/80
                    "
                  >
                    ★
                  </div>
                );
              }


              const card =
                item as MemoryCard;


              const isFlipped =
                card.isMatched ||
                card.id ===
                  state.firstChoiceId ||
                card.id ===
                  state.secondChoiceId;


              const disabled =
                state.phase !==
                  "playing" ||
                state.boardLocked ||
                card.isMatched ||
                isFlipped;


              return (
                <Card
                  key={
                    card.id
                  }

                  card={
                    card
                  }

                  isFlipped={
                    isFlipped
                  }

                  disabled={
                    disabled
                  }

                  onClick={
                    handleCardClick
                  }
                />
              );
            },
          )
        }

      </div>

    </div>
  );
}


export default GameBoard;