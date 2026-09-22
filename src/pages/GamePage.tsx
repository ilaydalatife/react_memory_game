import {
  Navigate,
  useParams,
} from "react-router-dom";

import GameSession from "@/components/GameSession";

import {
  GAME_CONFIG,
  isDifficultyKey,
} from "@/data/gameConfig";


function GamePage() {
  /*
    URL:

    /game/easy

    ise:

    difficulty = "easy"
  */
  const {
    difficulty,
  } = useParams<{
    difficulty: string;
  }>();


  /*
    Difficulty parametresi yoksa
    ana sayfaya dön.
  */
  if (!difficulty) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }


  /*
    easy / medium / hard dışında
    bir değer geldiyse ana sayfaya dön.
  */
  if (
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


  /*
    Seçilen difficulty'nin
    config bilgisini alıyoruz.
  */
  const config =
    GAME_CONFIG[
      difficulty
    ];


  /*
    ==================================================
    GAMEPAGE ARTIK SADECE PAGE GÖREVİNDE
    ==================================================

    GamePage artık:

    - kart state'i tutmuyor
    - timer tutmuyor
    - countdown tutmuyor
    - eşleşme yapmıyor
    - hamle hesaplamıyor

    Sadece:

    URL
       ↓
    difficulty
       ↓
    config
       ↓
    GameSession

    akışını yönetiyor.
  */
  return (
    <GameSession
      key={
        config.key
      }

      config={
        config
      }
    />
  );
}


export default GamePage;