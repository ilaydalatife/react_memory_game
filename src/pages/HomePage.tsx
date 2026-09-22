import {
  Link,
} from "react-router-dom";

import {
  GAME_CONFIG,
} from "@/data/gameConfig";

import type {
  DifficultyConfig,
  DifficultyKey,
} from "@/types/game";


/*
  Her zorluk seviyesinin görsel bilgilerinin tipi.
*/
interface DifficultyStyle {
  icon: string;

  description: string;

  badge: string;

  iconClass: string;

  hoverClass: string;
}


/*
  Görsel ayarları oyun config'inden ayrı tutuyoruz.

  GAME_CONFIG:
  oyun davranışını yönetir.

  DIFFICULTY_STYLES:
  sadece UI bilgisini yönetir.
*/
const DIFFICULTY_STYLES:
  Record<
    DifficultyKey,
    DifficultyStyle
  > = {
  easy: {
    icon: "🌱",

    description:
      "Hızlı bir başlangıç için ideal.",

    badge:
      "Başlangıç",

    iconClass:
      "bg-emerald-50 text-emerald-600 ring-emerald-100",

    hoverClass:
      "hover:border-emerald-300 hover:shadow-emerald-100/60",
  },

  medium: {
    icon: "⚡",

    description:
      "Hafızanı biraz daha zorla.",

    badge:
      "Orta",

    iconClass:
      "bg-amber-50 text-amber-600 ring-amber-100",

    hoverClass:
      "hover:border-amber-300 hover:shadow-amber-100/60",
  },

  hard: {
    icon: "🔥",

    description:
      "En büyük grid ile meydan oku.",

    badge:
      "Zorlu",

    iconClass:
      "bg-rose-50 text-rose-600 ring-rose-100",

    hoverClass:
      "hover:border-rose-300 hover:shadow-rose-100/60",
  },
};


function HomePage() {
  /*
    Config object'ini array'e çeviriyoruz.

    Böylece map ile üç seviye kartını
    oluşturabiliriz.
  */
  const difficulties:
    DifficultyConfig[] =
    Object.values(
      GAME_CONFIG,
    );


  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-slate-50
        px-5
        py-10
        text-slate-900
        sm:px-8
        lg:px-12
      "
    >
      {/*
        Sadece Tailwind kullanarak
        arka planda dekoratif blur alanları.
      */}
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


      {/*
        Ana içerik.
      */}
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[calc(100vh-5rem)]
          w-full
          max-w-6xl
          flex-col
          justify-center
        "
      >

        {/* ÜST BAŞLIK */}
        <header
          className="
            mx-auto
            mb-12
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
            Matching
            {" "}

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


        {/* LEVEL BAŞLIĞI */}
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
                text-slate-900
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


        {/* DIFFICULTY CARDS */}
        <section
          className="
            grid
            grid-cols-1
            gap-5
            md:grid-cols-3
          "
        >
          {difficulties.map(
            (
              difficulty,
            ) => {
              const style =
                DIFFICULTY_STYLES[
                  difficulty.key
                ];


              return (
                <Link
                  key={
                    difficulty.key
                  }

                  to={`/game/${difficulty.key}`}

                  className={`
                    group
                    relative
                    overflow-hidden
                    rounded-[1.75rem]
                    border
                    border-slate-200
                    bg-white
                    p-6
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1.5
                    hover:shadow-2xl
                    ${style.hoverClass}
                  `}
                >
                  {/*
                    Kart üst çizgisi.
                  */}
                  <div
                    className="
                      absolute
                      inset-x-0
                      top-0
                      h-1
                      origin-left
                      scale-x-0
                      bg-gradient-to-r
                      from-teal-400
                      to-violet-500
                      transition-transform
                      duration-300
                      group-hover:scale-x-100
                    "
                  />


                  {/* ICON + BADGE */}
                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-4
                    "
                  >
                    <div
                      className={`
                        grid
                        h-14
                        w-14
                        place-items-center
                        rounded-2xl
                        text-2xl
                        ring-1
                        transition-transform
                        duration-300
                        group-hover:scale-110
                        ${style.iconClass}
                      `}
                    >
                      {style.icon}
                    </div>


                    <span
                      className="
                        rounded-full
                        bg-slate-100
                        px-3
                        py-1
                        text-xs
                        font-bold
                        text-slate-500
                      "
                    >
                      {style.badge}
                    </span>
                  </div>


                  {/* TITLE */}
                  <div
                    className="
                      mt-8
                    "
                  >
                    <h3
                      className="
                        text-2xl
                        font-bold
                        tracking-tight
                        text-slate-900
                      "
                    >
                      {
                        difficulty.label
                      }
                    </h3>


                    <p
                      className="
                        mt-2
                        min-h-12
                        text-sm
                        leading-6
                        text-slate-500
                      "
                    >
                      {
                        style.description
                      }
                    </p>
                  </div>


                  {/* GAME INFO */}
                  <div
                    className="
                      mt-6
                      grid
                      grid-cols-2
                      gap-3
                    "
                  >
                    <div
                      className="
                        rounded-2xl
                        bg-slate-50
                        px-4
                        py-3
                      "
                    >
                      <span
                        className="
                          block
                          text-xs
                          font-medium
                          text-slate-400
                        "
                      >
                        Grid
                      </span>

                      <strong
                        className="
                          mt-1
                          block
                          text-base
                          text-slate-700
                        "
                      >
                        {
                          difficulty.rows
                        }
                        {" × "}
                        {
                          difficulty.columns
                        }
                      </strong>
                    </div>


                    <div
                      className="
                        rounded-2xl
                        bg-slate-50
                        px-4
                        py-3
                      "
                    >
                      <span
                        className="
                          block
                          text-xs
                          font-medium
                          text-slate-400
                        "
                      >
                        Eş
                      </span>

                      <strong
                        className="
                          mt-1
                          block
                          text-base
                          text-slate-700
                        "
                      >
                        {
                          difficulty.pairCount
                        } çift
                      </strong>
                    </div>
                  </div>


                  {/* BUTTON GÖRÜNÜMÜ */}
                  <div
                    className="
                      mt-6
                      flex
                      items-center
                      justify-between
                      border-t
                      border-slate-100
                      pt-5
                    "
                  >
                    <span
                      className="
                        text-sm
                        font-bold
                        text-slate-700
                        transition-colors
                        group-hover:text-teal-600
                      "
                    >
                      Oyunu başlat
                    </span>


                    <span
                      className="
                        grid
                        h-9
                        w-9
                        place-items-center
                        rounded-full
                        bg-slate-100
                        text-lg
                        text-slate-600
                        transition-all
                        duration-300
                        group-hover:translate-x-1
                        group-hover:bg-teal-500
                        group-hover:text-white
                      "
                    >
                      →
                    </span>
                  </div>

                </Link>
              );
            },
          )}
        </section>


        {/* ALT BİLGİLER */}
        <footer
          className="
            mt-8
            grid
            grid-cols-1
            gap-3
            sm:grid-cols-3
          "
        >
          <div
            className="
              flex
              items-center
              justify-center
              gap-3
              rounded-2xl
              border
              border-slate-200
              bg-white/70
              px-4
              py-3
              text-sm
              text-slate-500
              backdrop-blur
            "
          >
            <span>
              ⏱️
            </span>

            Süreni takip et
          </div>


          <div
            className="
              flex
              items-center
              justify-center
              gap-3
              rounded-2xl
              border
              border-slate-200
              bg-white/70
              px-4
              py-3
              text-sm
              text-slate-500
              backdrop-blur
            "
          >
            <span>
              🎯
            </span>

            Daha az hamle yap
          </div>


          <div
            className="
              flex
              items-center
              justify-center
              gap-3
              rounded-2xl
              border
              border-slate-200
              bg-white/70
              px-4
              py-3
              text-sm
              text-slate-500
              backdrop-blur
            "
          >
            <span>
              🧠
            </span>

            Hafızanı zorla
          </div>
        </footer>

      </div>
    </main>
  );
}


export default HomePage;