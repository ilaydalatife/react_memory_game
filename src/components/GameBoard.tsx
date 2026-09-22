import {
  useEffect,
  useRef,
  useState,
} from "react";

import Card from "@/components/Card";

import {
  createDeck,
} from "@/utils/gameUtils";

import type {
  MemoryCard,
} from "@/types/game";


interface GameBoardProps {
  pairCount: number;

  columns: number;

  hasBlockedCell: boolean;

  isActive: boolean;

  onAllMatched: (
    finalMoves: number,
  ) => void;

  onRevealComplete: () => void;
}


/*
  Normal MemoryCard dışında
  orta seviyede kullanılacak boş hücre tipi.
*/
interface BlockedCell {
  id: string;

  isBlocked: true;
}


function GameBoard({
  pairCount,
  columns,
  hasBlockedCell,
  isActive,
  onAllMatched,
  onRevealComplete,
}: GameBoardProps) {
  /*
    ======================================================
    COMPONENT KENDİ STATE'İNİ YÖNETİYOR
    ======================================================

    Eskiden bu state'lerin tamamı GamePage içerisindeydi.

    Artık:

    cards
    firstChoiceId
    secondChoiceId
    boardLocked
    moves

    tamamen GameBoard'a ait.

    Çünkü hepsi kart oyununun iç mantığıyla ilgili.
  */


  /*
    Kart destesini ilk render sırasında oluşturuyoruz.
  */
  const [
    cards,
    setCards,
  ] = useState<MemoryCard[]>(
    () =>
      createDeck(
        pairCount,
      ),
  );


  /*
    İlk seçilen kart.
  */
  const [
    firstChoiceId,
    setFirstChoiceId,
  ] = useState<
    string | null
  >(null);


  /*
    İkinci seçilen kart.
  */
  const [
    secondChoiceId,
    setSecondChoiceId,
  ] = useState<
    string | null
  >(null);


  /*
    İki kart kontrol edilirken
    üçüncü karta basılmasını engeller.
  */
  const [
    boardLocked,
    setBoardLocked,
  ] = useState<boolean>(
    false,
  );


  /*
    Hamle state'i de GameBoard'a ait.

    2 kart açılması = 1 hamle.
  */
  const [
    moves,
    setMoves,
  ] = useState<number>(0);


  /*
    Timeout id'sini saklıyoruz.

    useRef değiştiğinde component render olmaz.
  */
  const comparisonTimerRef =
    useRef<number | null>(
      null,
    );


  /*
    Component kaldırılırsa
    çalışan timeout'u temizle.
  */
  useEffect(() => {
    return () => {
      if (
        comparisonTimerRef.current !==
        null
      ) {
        window.clearTimeout(
          comparisonTimerRef.current,
        );
      }
    };
  }, []);


  /*
    KARTA TIKLAMA
  */
  const handleCardClick = (
    cardId: string,
  ): void => {
    /*
      Countdown devam ediyorsa
      oyun aktif değildir.
    */
    if (!isActive) {
      return;
    }


    /*
      İki kart karşılaştırılırken
      başka karta basılamaz.
    */
    if (boardLocked) {
      return;
    }


    /*
      Tıklanan kartı buluyoruz.
    */
    const clickedCard =
      cards.find(
        (card) =>
          card.id === cardId,
      );


    /*
      Kart bulunamadıysa çık.
    */
    if (!clickedCard) {
      return;
    }


    /*
      Zaten eşleşmiş karta basılmamalı.
    */
    if (
      clickedCard.isMatched
    ) {
      return;
    }


    /*
      ==================================
      İLK KART
      ==================================
    */
    if (
      firstChoiceId === null
    ) {
      setFirstChoiceId(
        cardId,
      );

      return;
    }


    /*
      Aynı karta iki kez basılmasın.
    */
    if (
      firstChoiceId === cardId
    ) {
      return;
    }


    /*
      ==================================
      İKİNCİ KART
      ==================================
    */
    setSecondChoiceId(
      cardId,
    );


    /*
      Karşılaştırma boyunca
      board kilitlenir.
    */
    setBoardLocked(
      true,
    );


    /*
      İki kart açıldı:

      1 hamle.
    */
    const nextMoves =
      moves + 1;


    setMoves(
      nextMoves,
    );


    /*
      İlk kartı buluyoruz.
    */
    const firstCard =
      cards.find(
        (card) =>
          card.id ===
          firstChoiceId,
      );


    if (!firstCard) {
      setBoardLocked(
        false,
      );

      return;
    }


    /*
      İki sembol aynı mı?
    */
    const isMatch =
      firstCard.symbol ===
      clickedCard.symbol;


    /*
      ==================================
      DOĞRU EŞLEŞME
      ==================================
    */
    if (isMatch) {
      const updatedCards =
        cards.map(
          (card) => {
            /*
              İlk ve ikinci seçilen kartı
              matched yap.
            */
            if (
              card.id ===
                firstChoiceId ||
              card.id ===
                cardId
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


      setCards(
        updatedCards,
      );


      /*
        Bütün kartlar bulundu mu?
      */
      const allMatched =
        updatedCards.every(
          (card) =>
            card.isMatched,
        );


      /*
        Son eşleşme ise parent componenti
        hemen bilgilendir.

        Böylece timer durabilir.
      */
      if (allMatched) {
        onAllMatched(
          nextMoves,
        );
      }


      /*
        Kart dönüş animasyonunun
        görünmesi için biraz bekle.
      */
      comparisonTimerRef.current =
        window.setTimeout(
          () => {
            setFirstChoiceId(
              null,
            );

            setSecondChoiceId(
              null,
            );

            setBoardLocked(
              false,
            );


            /*
              Son kart dönüşünü bitirdi.

              Artık modal açılabilir.
            */
            if (allMatched) {
              onRevealComplete();
            }


            comparisonTimerRef.current =
              null;
          },
          500,
        );


      return;
    }


    /*
      ==================================
      YANLIŞ EŞLEŞME
      ==================================

      Kartları 900ms gösterip kapatıyoruz.
    */
    comparisonTimerRef.current =
      window.setTimeout(
        () => {
          setFirstChoiceId(
            null,
          );

          setSecondChoiceId(
            null,
          );

          setBoardLocked(
            false,
          );

          comparisonTimerRef.current =
            null;
        },
        900,
      );
  };


  /*
    Orta seviyedeki kilitli hücrenin index'i.
  */
  const blockedIndex =
    hasBlockedCell
      ? Math.floor(
          (cards.length + 1) /
            2,
        )
      : -1;


  /*
    Render edeceğimiz hücreler.

    MemoryCard veya BlockedCell olabilir.
  */
  const cells:
    Array<
      MemoryCard |
      BlockedCell
    > = [
    ...cards,
  ];


  /*
    Orta seviye ise merkeze
    boş hücre ekle.
  */
  if (hasBlockedCell) {
    cells.splice(
      blockedIndex,
      0,
      {
        id: "blocked-cell",

        isBlocked: true,
      },
    );
  }


  /*
    Tailwind class'ları runtime'da tamamen
    dinamik üretmemek için map kullanıyoruz.

    Böylece Tailwind:

    grid-cols-4
    grid-cols-5
    grid-cols-6

    class'larını kaynak kodda görebilir.
  */
  const columnClasses:
    Record<
      number,
      string
    > = {
    4: "grid-cols-4",

    5: "grid-cols-5",

    6: "grid-cols-6",
  };


  const gridColumnClass =
    columnClasses[columns] ??
    "grid-cols-4";


  return (
    <div>

      {/*
        Hamle state'inin sahibi GameBoard olduğu için
        hamle göstergesini de burada gösteriyoruz.
      */}
      <div
        className="
          mb-3
          flex
          justify-center
        "
      >
        <div
          className="
            min-w-24
            rounded-2xl
            bg-white
            px-4
            py-2
            text-center
            shadow
          "
        >
          <span
            className="
              block
              text-xs
              font-bold
              uppercase
              tracking-wider
              text-slate-500
            "
          >
            Hamle
          </span>

          <strong
            className="
              mt-1
              block
              text-lg
              text-slate-800
            "
          >
            {moves}
          </strong>
        </div>
      </div>


      <div
        className={`
          grid
          ${gridColumnClass}
          mx-auto
          w-full
          max-w-3xl
          gap-2
          rounded-3xl
          bg-gradient-to-br
          from-teal-400
          via-cyan-500
          to-violet-500
          p-3
          shadow-2xl
          sm:gap-4
          sm:p-6
        `}
      >

        {cells.map(
          (item) => {
            /*
              Orta seviyedeki boş hücre.
            */
            if (
              "isBlocked" in
                item &&
              item.isBlocked
            ) {
              return (
                <div
                  key={
                    item.id
                  }

                  aria-hidden="true"

                  className="
                    grid
                    aspect-square
                    place-items-center
                    rounded-xl
                    border-2
                    border-dashed
                    border-white/50
                    bg-white/10
                    text-xl
                    text-white/80
                  "
                >
                  ★
                </div>
              );
            }


            /*
              Buradan sonra item MemoryCard.
            */
            const card =
              item as MemoryCard;


            /*
              Kart hangi durumda açık?
            */
            const isFlipped =
              card.isMatched ||
              card.id ===
                firstChoiceId ||
              card.id ===
                secondChoiceId;


            /*
              Hangi durumda karta tıklanamaz?
            */
            const disabled =
              !isActive ||
              boardLocked ||
              card.isMatched ||
              isFlipped;


            return (
              <Card
                key={
                  card.id
                }

                card={
                  card
                }

                isFlipped={
                  isFlipped
                }

                disabled={
                  disabled
                }

                onClick={
                  handleCardClick
                }
              />
            );
          },
        )}

      </div>

    </div>
  );
}


export default GameBoard;