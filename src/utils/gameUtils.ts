import {
  CARD_SYMBOLS,
} from "@/data/gameConfig";

import type {
  MemoryCard,
} from "@/types/game";


export function shuffleArray<T>(
  items: T[],
): T[] {
  const shuffled = [
    ...items,
  ];


  /*
    Fisher-Yates Shuffle algoritması.
  */
  for (
    let i = shuffled.length - 1;
    i > 0;
    i -= 1
  ) {
    const randomIndex =
      Math.floor(
        Math.random() * (i + 1),
      );


    [
      shuffled[i],
      shuffled[randomIndex],
    ] = [
      shuffled[randomIndex],
      shuffled[i],
    ];
  }


  return shuffled;
}


export function createDeck(
  pairCount: number,
): MemoryCard[] {
  const symbols =
    CARD_SYMBOLS.slice(
      0,
      pairCount,
    );


  const cards: MemoryCard[] =
    symbols.flatMap(
      (
        symbol,
        index,
      ) => [
        {
          id: `${index}-a-${crypto.randomUUID()}`,

          symbol,

          isMatched: false,
        },

        {
          id: `${index}-b-${crypto.randomUUID()}`,

          symbol,

          isMatched: false,
        },
      ],
    );


  return shuffleArray(cards);
}


export function formatTime(
  totalSeconds: number,
): string {
  const minutes =
    Math.floor(
      totalSeconds / 60,
    );


  const seconds =
    totalSeconds % 60;


  return `${String(minutes).padStart(
    2,
    "0",
  )}:${String(seconds).padStart(
    2,
    "0",
  )}`;
}