import {
  useCallback,
  useMemo,
  useReducer,
  type PropsWithChildren,
} from "react";

import {
  GameContext,
} from "@/context/game-context";

import {
  useGameConfig,
} from "@/hooks/useGameConfig";

import {
  createInitialGameState,
  gameReducer,
} from "@/reducers/gameReducer";

import {
  createDeck,
} from "@/utils/gameUtils";

import type {
  DifficultyKey,
} from "@/types/game";


interface GameProviderProps
  extends PropsWithChildren {
  difficulty: DifficultyKey;
}


function GameProvider({
  difficulty,
  children,
}: GameProviderProps) {
  /*
    ==================================================
    CONFIG ARTIK CONTEXT'TEN ALINIYOR
    ==================================================

    Eski:

    import { GAME_CONFIG } ...

    Yeni:

    GameConfigContext
        ↓
    useGameConfig()
        ↓
    getDifficultyConfig()
  */
  const {
    getDifficultyConfig,
  } = useGameConfig();


  const config =
    getDifficultyConfig(
      difficulty,
    );


  /*
    ==================================================
    REDUCER BAŞLANGIÇ STATE
    ==================================================

    cards
    moves
    seconds
    countdown
    phase
    selection state

    artık reducer tarafından yönetiliyor.
  */
  const [
    state,
    dispatch,
  ] = useReducer(
    gameReducer,
    config,
    createInitialGameState,
  );


  /*
    Yeni oyun action'ı.

    Yeni deste burada oluşturulur,
    reducer'a action olarak dispatch edilir.
  */
  const resetGame =
    useCallback(
      (): void => {
        dispatch({
          type:
            "RESET_GAME",

          payload: {
            cards:
              createDeck(
                config.pairCount,
              ),
          },
        });
      },
      [
        config.pairCount,
      ],
    );


  const value =
    useMemo(
      () => ({
        state,

        config,

        dispatch,

        resetGame,
      }),
      [
        state,
        config,
        resetGame,
      ],
    );


  return (
    <GameContext.Provider
      value={value}
    >
      {children}
    </GameContext.Provider>
  );
}


export default GameProvider;