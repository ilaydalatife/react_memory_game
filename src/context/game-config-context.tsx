import {
  createContext,
} from "react";

import type {
  DifficultyConfig,
  DifficultyKey,
} from "@/types/game";


export interface GameConfigContextValue {
  difficulties: DifficultyConfig[];

  getDifficultyConfig: (
    key: DifficultyKey,
  ) => DifficultyConfig;

  isDifficultyKey: (
    value: string,
  ) => value is DifficultyKey;
}


export const GameConfigContext =
  createContext<
    GameConfigContextValue | undefined
  >(undefined);