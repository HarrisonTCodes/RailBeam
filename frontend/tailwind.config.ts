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
        "cream": "#faf8f5",
        "primary": "#142c8e",
        "secondary": "#003087",
        "highlight": "#0070e0"
      }
    },
  },
  plugins: [],
};
export default config;
