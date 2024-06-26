import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'my-shadow': "hsl(var(--my-shadow) / <alpha-value>)",
        'my-input': "hsl(var(--my-input) / <alpha-value>)",
        'my-glassBg': "hsl(var(--my-glassBg) / <alpha-value>)",
      },
      fontFamily: {
        lora: ['lora']
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require('daisyui')],
};
export default config;
