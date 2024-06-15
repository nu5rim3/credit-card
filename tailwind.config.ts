import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { ...colors.blue, DEFAULT: colors.blue[900] },
      },
      backgroundImage: {
        "card-pattern": "url('/img/hero-pattern.svg')",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
} satisfies Config;

export default config;
