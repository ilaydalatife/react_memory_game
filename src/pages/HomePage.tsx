import DifficultyCard
  from "@/components/DifficultyCard";

import {
  useGameConfig,
} from "@/hooks/useGameConfig";


function HomePage() {
  /*
    ==================================================
    CONFIG CONTEXT
    ==================================================

    GAME_CONFIG doğrudan import edilmiyor.

    Difficulty bilgileri Context'ten geliyor.
  */
  const {
    difficulties,
  } = useGameConfig();


  return (
    <main
      className="
        relative
        min-h-dvh
        overflow-hidden

        bg-slate-50

        px-5
        py-10

        text-slate-900

        sm:px-8
        lg:px-12
      "
    >

      {/* Arka plan dekorasyonu */}
      <div
        aria-hidden="true"

        className="
          pointer-events-none
          absolute
          -left-32
          -top-32

          h-96
          w-96

          rounded-full

          bg-teal-200/40

          blur-3xl
        "
      />


      <div
        aria-hidden="true"

        className="
          pointer-events-none
          absolute
          -bottom-40
          -right-24

          h-[28rem]
          w-[28rem]

          rounded-full

          bg-violet-200/40

          blur-3xl
        "
      />


      <div
        className="
          relative
          z-10

          mx-auto

          flex
          min-h-[calc(100dvh-5rem)]
          w-full
          max-w-6xl

          flex-col
          justify-center
        "
      >

        <header
          className="
            mx-auto
            mb-10
            max-w-3xl
            text-center
          "
        >

          <div
            className="
              mb-5
              inline-flex
              items-center
              gap-2

              rounded-full

              border
              border-teal-200

              bg-white/80

              px-4
              py-2

              text-sm
              font-semibold
              text-teal-700

              shadow-sm
              backdrop-blur
            "
          >
            <span
              className="
                h-2
                w-2
                rounded-full
                bg-teal-500
              "
            />

            React Memory Challenge
          </div>


          <h1
            className="
              text-4xl
              font-black
              tracking-tight
              text-slate-900

              sm:text-5xl
              lg:text-6xl
            "
          >
            Matching{" "}

            <span
              className="
                bg-gradient-to-r
                from-teal-500
                via-cyan-500
                to-violet-500

                bg-clip-text
                text-transparent
              "
            >
              Game
            </span>
          </h1>


          <p
            className="
              mx-auto
              mt-6
              max-w-2xl

              text-base
              leading-7
              text-slate-500

              sm:text-lg
            "
          >
            Kartların konumlarını hatırla,
            eşlerini bul ve oyunu mümkün olan
            en kısa sürede tamamla.
          </p>

        </header>


        <div
          className="
            mb-5
            flex
            items-end
            justify-between
            gap-4
          "
        >
          <div>

            <p
              className="
                text-sm
                font-bold
                uppercase
                tracking-[0.15em]
                text-teal-600
              "
            >
              Oyun modu
            </p>


            <h2
              className="
                mt-1
                text-2xl
                font-bold
                tracking-tight
              "
            >
              Bir zorluk seviyesi seç
            </h2>

          </div>


          <p
            className="
              hidden
              text-sm
              text-slate-400

              md:block
            "
          >
            Seviye yükseldikçe kart sayısı artar.
          </p>
        </div>


        <section
          className="
            grid
            grid-cols-1
            gap-5

            md:grid-cols-3
          "
        >
          {
            difficulties.map(
              (difficulty) => (
                <DifficultyCard
                  key={
                    difficulty.key
                  }

                  difficulty={
                    difficulty
                  }
                />
              ),
            )
          }
        </section>

      </div>

    </main>
  );
}


export default HomePage;