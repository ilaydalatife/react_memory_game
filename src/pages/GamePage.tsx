import {
  Navigate,
  useParams,
} from "react-router-dom";

import GameSession
  from "@/components/GameSession";

import GameProvider
  from "@/providers/GameProvider";

import {
  useGameConfig,
} from "@/hooks/useGameConfig";


function GamePage() {
  const {
    difficulty,
  } = useParams<{
    difficulty: string;
  }>();


  /*
    Config validasyonu da
    GameConfigContext üzerinden.
  */
  const {
    isDifficultyKey,
  } = useGameConfig();


  if (
    !difficulty ||
    !isDifficultyKey(
      difficulty,
    )
  ) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }


  return (
    /*
      difficulty değiştiğinde
      yeni Provider oluşturulur.

      Böylece reducer başlangıç state'i
      yeniden hazırlanır.
    */
    <GameProvider
      key={
        difficulty
      }

      difficulty={
        difficulty
      }
    >
      <GameSession />
    </GameProvider>
  );
}


export default GamePage;