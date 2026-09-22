import {
  CARD_SYMBOLS,
} from "@/data/gameConfig";

import type {
  MemoryCard,
} from "@/types/game";


/*
  Generic array karıştırma fonksiyonu.
*/
export function shuffleArray<T>(
  items: T[],
): T[] {
  /*
    kopyasını oluştur.
  */
  const shuffled: T[] = [
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


/*
  pairCount kadar çift kart üretir.
*/
export function createDeck(
  pairCount: number,
): MemoryCard[] {
  /*
    Gerekli sembolleri seçiyoruz.
  */
  const selectedSymbols =
    CARD_SYMBOLS.slice(
      0,
      pairCount,
    );


  /*
    Her sembolden iki adet kart oluşturuyoruz.
  */
  const cards: MemoryCard[] =
    selectedSymbols.flatMap(
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


  /*
    Kartları karıştırıp döndürüyoruz.
  */
  return shuffleArray(cards);
}


/*
  Saniyeyi:

  75

  →

  01:15

  formatına dönüştürür.
*/
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