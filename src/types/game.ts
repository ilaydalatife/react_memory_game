/*
  Oyunda kullanılabilecek zorluk seviyeleri.
*/
export type DifficultyKey = "easy" | "medium" | "hard";

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

  icon: string;

  badge: string;

  description: string;
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
  Oyunun bulunduğu aşama.
*/
export type GamePhase = "countdown" | "playing" | "finishing" | "finished";


/*
  Oyun bittiğinde kullanılacak sonuç bilgisi.
*/
export type PairResult = "match" | "mismatch" | null;

export interface GameState {
  /*
    Config reducer state'i içerisinde de tutuluyor.

    Böylece RESET_GAME action'ında mevcut
    difficulty bilgisi kaybolmuyor.
  */
  config: DifficultyConfig;

  cards: MemoryCard[];

  firstChoiceId: string | null;

  secondChoiceId: string | null;

  pendingPairResult: PairResult;

  boardLocked: boolean;

  moves: number;

  seconds: number;

  countdown: number;

  phase: GamePhase;
}

/* reducer ile kullanılabilecek tüm  action türlerini ve
her action un taşıyabileceği payload verisi tanımlanır */
export type GameAction =
  | {
      type: "COUNTDOWN_TICK";
    }
  | {
      type: "COUNTDOWN_COMPLETE";
    }
  | {
      type: "TIMER_TICK";
    }
  | {
      type: "SELECT_CARD";
      payload: {
        cardId: string;
      };
    }
  | {
      type: "RESOLVE_PAIR";
    }
  | {
      type: "RESET_GAME";
      payload: {
        cards: MemoryCard[];
      };
    };
