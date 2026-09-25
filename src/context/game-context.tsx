import {
  createContext,
  type Dispatch,
} from "react";

import type {
  DifficultyConfig,
  GameAction,
  GameState,
} from "@/types/game";


export interface GameContextValue {
  state: GameState;

  config: DifficultyConfig;

  dispatch:
    Dispatch<GameAction>;

  resetGame: () => void;
}


export const GameContext =
  createContext<
    GameContextValue | undefined
  >(undefined);