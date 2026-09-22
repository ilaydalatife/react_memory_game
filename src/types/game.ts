/*
  Oyunda kullanılabilecek zorluk seviyeleri.
*/
export type DifficultyKey =
  | "easy"
  | "medium"
  | "hard";


/*
  Bir difficulty'nin sahip olması gereken bilgiler.
*/
export interface DifficultyConfig {
  key: DifficultyKey;

  label: string;

  rows: number;

  columns: number;

  pairCount: number;

  hasBlockedCell: boolean;
}


/*
  Tek bir kartın modeli.
*/
export interface MemoryCard {
  id: string;

  symbol: string;

  isMatched: boolean;
}


/*
  Oyun bittiğinde kullanılacak sonuç bilgisi.
*/
export interface GameResult {
  seconds: number;

  moves: number;
}


/*
  Oyunun bulunduğu aşama.
*/
export type GamePhase =
  | "countdown"
  | "playing"
  | "finishing"
  | "finished";