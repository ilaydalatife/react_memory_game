import {
  createDeck,
} from "@/utils/gameUtils";

import type {
  DifficultyConfig,
  GameAction,
  GameState,
} from "@/types/game";


export function createInitialGameState(
  config: DifficultyConfig,
): GameState {
  return {
    config,

    cards:
      createDeck(
        config.pairCount,
      ),

    firstChoiceId:
      null,

    secondChoiceId:
      null,

    pendingPairResult:
      null,

    boardLocked:
      false,

    moves:
      0,

    seconds:
      0,

    countdown:
      3,

    phase:
      "countdown",
  };
}


export function gameReducer(
  state: GameState,
  action: GameAction,
): GameState {
  switch (
    action.type
  ) {
    /*
      3
      ↓
      2
      ↓
      1
      ↓
      0
    */
    case "COUNTDOWN_TICK": {
      if (
        state.countdown <= 0
      ) {
        return state;
      }


      return {
        ...state,

        countdown:
          state.countdown - 1,
      };
    }


    /*
      Countdown bitti.

      Oyun başlıyor.
    */
    case "COUNTDOWN_COMPLETE": {
      return {
        ...state,

        phase:
          "playing",
      };
    }


    /*
      Timer sadece playing
      durumunda artar.
    */
    case "TIMER_TICK": {
      if (
        state.phase !==
        "playing"
      ) {
        return state;
      }


      return {
        ...state,

        seconds:
          state.seconds + 1,
      };
    }


    /*
      Kullanıcı bir karta tıkladı.
    */
    case "SELECT_CARD": {
      if (
        state.phase !==
          "playing" ||
        state.boardLocked
      ) {
        return state;
      }


      const cardId =
        action.payload.cardId;


      const clickedCard =
        state.cards.find(
          (card) =>
            card.id === cardId,
        );


      /*
        Kart yoksa veya zaten eşleşmişse
        işlem yapma.
      */
      if (
        !clickedCard ||
        clickedCard.isMatched
      ) {
        return state;
      }


      /*
        İlk kart.
      */
      if (
        state.firstChoiceId ===
        null
      ) {
        return {
          ...state,

          firstChoiceId:
            cardId,
        };
      }


      /*
        Aynı karta tekrar tıklanamaz.
      */
      if (
        state.firstChoiceId ===
        cardId
      ) {
        return state;
      }


      const firstCard =
        state.cards.find(
          (card) =>
            card.id ===
            state.firstChoiceId,
        );


      if (!firstCard) {
        return state;
      }


      const isMatch =
        firstCard.symbol ===
        clickedCard.symbol;


      /*
        Şu anda eşleşmemiş kaç kart var?
      */
      const unmatchedCount =
        state.cards.filter(
          (card) =>
            !card.isMatched,
        ).length;


      /*
        Eğer kalan son iki kart
        birbirinin eşiyse:

        timer hemen durmalı.

        Bu yüzden phase = finishing.
      */
      const isFinalPair =
        isMatch &&
        unmatchedCount === 2;


      return {
        ...state,

        secondChoiceId:
          cardId,

        boardLocked:
          true,

        moves:
          state.moves + 1,

        pendingPairResult:
          isMatch
            ? "match"
            : "mismatch",

        phase:
          isFinalPair
            ? "finishing"
            : state.phase,
      };
    }


    /*
      Açılan iki kartın sonucunu uygular.
    */
    case "RESOLVE_PAIR": {
      if (
        !state.firstChoiceId ||
        !state.secondChoiceId ||
        !state.pendingPairResult
      ) {
        return state;
      }


      /*
        Eşleşme başarısızsa
        iki kart tekrar kapanır.
      */
      if (
        state.pendingPairResult ===
        "mismatch"
      ) {
        return {
          ...state,

          firstChoiceId:
            null,

          secondChoiceId:
            null,

          pendingPairResult:
            null,

          boardLocked:
            false,
        };
      }


      /*
        Doğru eşleşme.
      */
      const updatedCards =
        state.cards.map(
          (card) => {
            if (
              card.id ===
                state.firstChoiceId ||
              card.id ===
                state.secondChoiceId
            ) {
              return {
                ...card,

                isMatched:
                  true,
              };
            }


            return card;
          },
        );


      const allMatched =
        updatedCards.every(
          (card) =>
            card.isMatched,
        );


      return {
        ...state,

        cards:
          updatedCards,

        firstChoiceId:
          null,

        secondChoiceId:
          null,

        pendingPairResult:
          null,

        boardLocked:
          false,

        phase:
          allMatched
            ? "finished"
            : "playing",
      };
    }


    /*
      Yeni oyun.

      Dikkat:

      Yeni kartlar Context içerisinde oluşturulup
      action payload olarak reducer'a gönderiliyor.

      Böylece reducer mümkün olduğunca saf kalıyor.
    */
    case "RESET_GAME": {
      return {
        ...state,

        cards:
          action.payload.cards,

        firstChoiceId:
          null,

        secondChoiceId:
          null,

        pendingPairResult:
          null,

        boardLocked:
          false,

        moves:
          0,

        seconds:
          0,

        countdown:
          3,

        phase:
          "countdown",
      };
    }


    default:
      return state;
  }
}