import type {
  DifficultyConfig,
  DifficultyKey,
} from "@/types/game";


/*
  Kartların üzerindeki semboller.
*/
export const CARD_SYMBOLS: string[] = [
  "🚲",
  "⚓",
  "✈️",
  "🚗",
  "⚽",
  "🚀",
  "🎧",
  "🎯",
  "🎸",
  "⌚",
  "💡",
  "📷",
  "🧭",
  "🛸",
  "🚂",
  "🏀",
  "🎮",
  "🌍",
];


/*
  Oyun seviyeleri.
*/
export const GAME_CONFIG: Record<
  DifficultyKey,
  DifficultyConfig
> = {
  easy: {
    key: "easy",

    label: "Kolay",

    rows: 4,

    columns: 4,

    // 16 kart = 8 çift.
    pairCount: 8,

    hasBlockedCell: false,
  },

  medium: {
    key: "medium",

    label: "Orta",

    rows: 5,

    columns: 5,

    /*
      24 kart = 12 çift
      +
      1 kilitli hücre
    */
    pairCount: 12,

    hasBlockedCell: true,
  },

  hard: {
    key: "hard",

    label: "Zor",

    rows: 6,

    columns: 6,

    // 36 kart = 18 çift.
    pairCount: 18,

    hasBlockedCell: false,
  },
};


/*
  URL'den gelen değerin geçerli olup olmadığını kontrol eder.
*/
export function isDifficultyKey(
  value: string,
): value is DifficultyKey {
  return Object.prototype.hasOwnProperty.call(
    GAME_CONFIG,
    value,
  );
}