import {
  useContext,
} from "react";

import {
  GameConfigContext,
} from "@/context/game-config-context";


export function useGameConfig() {
  const context =
    useContext(
      GameConfigContext,
    );


  if (!context) {
    throw new Error(
      "useGameConfig, GameConfigProvider içerisinde kullanılmalıdır.",
    );
  }


  return context;
}