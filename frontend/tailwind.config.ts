import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "failure": "#de0404",
        "cream": {
          100: "#faf8f5",
          200: "#e8e1d9"
        },
        "primary": "#142c8e",
        "secondary": "#003087",
        "highlight": "#0070e0"
      },
      screens: {
        "md": "905px"
      }
    },
  },
  plugins: [],
};
export default config;
