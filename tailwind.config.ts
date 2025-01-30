import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "fetch-bg": "#fdfdfd",
        "fetch-form-bg": "#f9f7f2",
        "fetch-text": "#1a1a1a",
        "fetch-deep-purple": "#300d38",
        "fetch-purple": "#890075",
        "fetch-red": "#902000",
      },
    },
  },
  plugins: [],
} satisfies Config;
