import { useCallback, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import Countdown from "@/components/Countdown";
import GameBoard from "@/components/GameBoard";
import GameHeader from "@/components/GameHeader";
import GameOverModal from "@/components/GameOverModal";

import type { DifficultyConfig, GamePhase, GameResult } from "@/types/game";

interface GameSessionProps {
  config: DifficultyConfig;
}

function GameSession({ config }: GameSessionProps) {
  const navigate = useNavigate();

  /*
    ==================================================
    STATE SAHİPLİĞİ
    ==================================================

    GameSession sadece birden fazla componenti
    etkileyen ortak state'leri yönetiyor.

    Burada:

    cards yok.
    moves yok.
    seconds yok.
    selectedCard yok.

    Çünkü bunları child componentler yönetiyor.
  */
  const [phase, setPhase] = useState<GamePhase>("countdown");

  /*
    Oyun sonunda göstereceğimiz sonuç snapshot'ı.
  */
  const [result, setResult] = useState<GameResult | null>(null);

  /*
    Yeni oyun başladığında child componentleri
    yeniden oluşturmak için kullanılır.
  */
  const [gameId, setGameId] = useState<number>(1);

  /*
    ==================================================
    TIMER STATE'İ BURADA DEĞİL
    ==================================================

    seconds state'inin sahibi GameTimer.

    GameSession sadece son saniyeyi gerektiğinde
    okumak için ref kullanıyor.

    useRef render oluşturmaz.
  */
  const elapsedSecondsRef = useRef<number>(0);

  /*
    Countdown tamamlandı.
  */
  const handleCountdownComplete = useCallback((): void => {
    setPhase("playing");
  }, []);

  /*
    Timer son saniyeyi bildiriyor.
  */
  const handleTimeChange = useCallback((seconds: number): void => {
    elapsedSecondsRef.current = seconds;
  }, []);

  /*
    GameBoard bütün kartların bulunduğunu
    bildirdiğinde çalışır.
  */
  const handleAllMatched = useCallback((finalMoves: number): void => {
    /*
          playing'den çıkınca
          GameTimer duracak.
        */
    setPhase("finishing");

    /*
          Sonuç snapshot'ını kaydet.
        */
    setResult({
      seconds: elapsedSecondsRef.current,

      moves: finalMoves,
    });
  }, []);

  /*
    Son kart animasyonu tamamlandı.
  */
  const handleRevealComplete = useCallback((): void => {
    setPhase("finished");
  }, []);

  /*
    Yeni oyun.
  */
  const handleRestart = (): void => {
    /*
        Eski sonucu temizle.
      */
    setResult(null);

    /*
        Süre referansını temizle.
      */
    elapsedSecondsRef.current = 0;

    /*
        Tekrar countdown.
      */
    setPhase("countdown");

    /*
        ==================================================
        COMPONENT KENDİ STATE'İNİ RESETLİYOR
        ==================================================

        gameId değişince:

        GameBoard
        GameTimer
        Countdown

        yeni key alır.

        React eski componenti unmount edip
        yenisini mount eder.

        Böylece her component kendi useState
        başlangıç değerine geri döner.

        Parent:

        setCards([])
        setMoves(0)
        setSeconds(0)

        gibi child state'lerine müdahale etmez.
      */
    setGameId((currentGameId) => currentGameId + 1);
  };

  const handleHome = (): void => {
    navigate("/");
  };

  return (
    <main
      className="
    relative
    min-h-screen

    bg-gradient-to-br
    from-slate-50
    via-white
    to-violet-50

    px-4
    py-6

    text-slate-900

    sm:px-6
    lg:py-10
  "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-5xl
        "
      >
        <GameHeader
          difficultyLabel={config.label}
          isTimerRunning={phase === "playing"}
          timerKey={gameId}
          onTimeChange={handleTimeChange}
          onRestart={handleRestart}
          onHome={handleHome}
        />

        <section
          className="
            relative
          "
        >
          {/*
            ==================================================
            GAMEPAGE'DEN AYRILAN OYUN MOTORU
            ==================================================

            GameBoard artık:

            - kartları oluşturur
            - kartları seçer
            - eşleşmeyi kontrol eder
            - hamleyi tutar
            - kartları kapatır

            GamePage bunların hiçbirini bilmiyor.
          */}
          <GameBoard
            key={`board-${gameId}`}
            pairCount={config.pairCount}
            columns={config.columns}
            hasBlockedCell={config.hasBlockedCell}
            isActive={phase === "playing"}
            onAllMatched={handleAllMatched}
            onRevealComplete={handleRevealComplete}
          />

          {/*
            Countdown kendi state'ini yönetir.
          */}
          {phase === "countdown" && (
            <Countdown
              key={`countdown-${gameId}`}
              onComplete={handleCountdownComplete}
            />
          )}
        </section>
      </div>

      {phase === "finished" && result !== null && (
        <GameOverModal
          result={result}
          onRestart={handleRestart}
          onHome={handleHome}
        />
      )}
    </main>
  );
}

export default GameSession;
