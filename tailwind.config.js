/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,jsx,ts,tsx}",
    "./dist-vanilla/**/*.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        titillium: ["Titillium Web", "sans-serif"],
      },
      colors: {
        "brand-primary": "#006FE8",
        "brand-secondary": "#59D3C2",
        "brand-comp-yellow": "#FFF0D2",
        "brand-comp-green": "#D3EFD4",
        "brand-comp-lilac": "#E3DEF9",
        "brand-comp-lightblue": "#CFF6FF",
        "brand-darkening": "rgba(81, 90, 96, 0.06)",
        "action-default": "#006FE8",
        "action-alt-default": "#006FE8",
        "action-hover": "#338CED",
        "action-pressed": "#00438B",
        "action-focus": "#0059BA",
        "action-disabled": "#D7DBE1",
        "action-alt-default": "#BDEDE7",
        "action-alt-hover": "#EEFBF9",
        "action-alt-pressed": "#CDF2ED",
        "action-alt-focus": "#DEF6F3",
        "action-alt-disabled": "#D7DBE1",
        "text-default": "#31363A",
        "text-darker": "#181B1D",
        "text-lighter": "#70777C",
        "text-onbutton": "#FFFFFF",
        "text-onbutton-disabled": "#ADB2B5",
        "text-decorative": "#006FE8",
        "text-decorative-darker": "#0059BA",
        "text-alt": "#FFFFFF",
        "text-alternative": "#FFFFFF",
        "text-alt-onbutton": "#31363A",
        "text-alt-decorative": "#BDEDE7",
        "bg-primary": "#FFFFFF",
        "bg-secondary": "#F2F2F2",
        "bg-alt-primary": "#31319B",
        "bg-alt-secondary": "#0059BA",
        "border-primary": "#C2DFFF",
        "border-secondary": "#E7F2FF",
        "border-alt-primary": "#1358A3",
        "border-alt-secondary": "#3A76B8",
        "icon-default": "#006FE8",
        "icon-darker": "#31319B",
        "icon-lighter": "#7BD0C2",
        "icon-alt": "#FFFFFF",
        "success-primary": "#6DA36F",
        "success-secondary": "#D3EFD4",
        "error-text": "#C00F0C",
        "error-primary": "#DF563B",
        "error-secondary": "#FFE5E1",
        "info-primary": "#57B7FF",
        "info-secondary": "#CDE9FF",
        "warning-primary": "#FFD066",
        "warning-secondary": "#FFF0D2",
      },
      backgroundImage: (theme) => ({
        "gradient-primary-90":
          "linear-gradient(90deg, #59D3C2 0%, #006FE8 100%)",
        "gradient-primary-45":
          "linear-gradient(45deg, #006FE8 0%, #59D3C2 100%)",
      }),
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeInLarge: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        fadeOutLarge: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
      animation: {
        fadeIn: "fadeIn .15s ease-in-out",
        fadeOut: "fadeOut .15s ease-in-out",
        fadeOutLarge: "fadeOut .32s ease-in-out",
        fadeInLarge: "fadeIn .32s ease-in-out",
      },
      opacity: {
        // Only include opacity values you actually use
        0: "0",
        50: "0.5",
        75: "0.75",
        100: "1",
        // Remove other values like 5, 10, 15, etc.
      },
    },
  },
  plugins: [],
};
