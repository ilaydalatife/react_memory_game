import {
  useContext,
} from "react";

import {
  GameContext,
} from "@/context/game-context";


export function useGame() {
  const context =
    useContext(
      GameContext,
    );


  if (!context) {
    throw new Error(
      "useGame, GameProvider içerisinde kullanılmalıdır.",
    );
  }


  return context;
}