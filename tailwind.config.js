/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        mobile: { max: "767px" },      // < 768px
        tablet: "768px",               // >= 768px
        desktop: "992px",              // >= 992px
        wide: "1200px",                // >= 1200px
      },

      animation: {
        "event-auto": "eventModal 2.5s ease-in-out forwards",
        "event-choice": "eventChoice 0.3s ease-out forwards",
      },

      keyframes: {
        eventModal: {
          "0%": { opacity: "0", transform: "translateY(10px) scale(0.95)" },
          "15%": { opacity: "1", transform: "translateY(0) scale(1)" },
          "85%": { opacity: "1", transform: "translateY(0) scale(1)" },
          "100%": { opacity: "0", transform: "translateY(-10px) scale(0.95)" },
        },

        eventChoice: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        cardShake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-2px)" },
          "50%": { transform: "translateX(2px)" },
          "75%": { transform: "translateX(-2px)" },
        },
      },
      animation: {
        "card-shake": "cardShake 0.3s ease-in-out",
      },


      colors: {
        game: {
          bg: "#181818",
          back: "#f7f1e8ff",
          modal: "#2c2c2bff",
          board: "#ede3d4",
          highlight: "#876b4b",

          text: {
            main: "#2f2418",
            board: "white",
            secondary: "#5c4a32",
            soft: "#7a6648",
            title: "#3b2a16",
            inverse: "#f7f1e8",
          },

          success: "#0BEAA3",
          danger: "#A30BEA",
        },
      },

      fontFamily: {
        title: ["UnifrakturCook", "cursive"],
        body: ["Quintessential", "serif"],
        mono: ["Roboto Mono", "monospace"],
      },

      fontSize: {
        title: "32px",
        subtitle: "24px",
        paragraph: ["14px", { lineHeight: "1.5" }],
        button: "16px",
      },
    },
  },
  plugins: [],
}
