import {
  useCallback,
  useMemo,
  type PropsWithChildren,
} from "react";

import {
  GAME_CONFIG,
} from "@/data/gameConfig";

import {
  GameConfigContext,
} from "@/context/game-config-context";

import type {
  DifficultyConfig,
  DifficultyKey,
} from "@/types/game";


function GameConfigProvider({
  children,
}: PropsWithChildren) {
  /*
    GAME_CONFIG object'ini array'e dönüştürüyoruz.

    HomePage bunu context üzerinden alacak.
  */
  const difficulties =
    useMemo<
      DifficultyConfig[]
    >(
      () =>
        Object.values(
          GAME_CONFIG,
        ),
      [],
    );


  const getDifficultyConfig =
    useCallback(
      (
        key: DifficultyKey,
      ): DifficultyConfig => {
        return GAME_CONFIG[key];
      },
      [],
    );


  const isDifficultyKey =
    useCallback(
      (
        value: string,
      ): value is DifficultyKey => {
        return Object.prototype.hasOwnProperty.call(
          GAME_CONFIG,
          value,
        );
      },
      [],
    );


  const value =
    useMemo(
      () => ({
        difficulties,

        getDifficultyConfig,

        isDifficultyKey,
      }),
      [
        difficulties,
        getDifficultyConfig,
        isDifficultyKey,
      ],
    );


  return (
    <GameConfigContext.Provider
      value={value}
    >
      {children}
    </GameConfigContext.Provider>
  );
}


export default GameConfigProvider;