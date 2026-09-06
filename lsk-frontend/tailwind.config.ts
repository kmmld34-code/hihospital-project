import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        '1400': '1400px',
      },
      colors: {
        gem: {
          primary: "#0052CC",        // 메디컬 로열 블루
          primaryHover: "#0043A6",
          primaryLight: "#EBF2FC",
          primaryDark: "#071E54",     // 딥 네이비
          secondary: "#00A8B5",      // 메디컬 시언
          accent: "#F59E0B",         // 골드 앰버
          surface: "#F8FAFC",
          border: "#E2E8F0",
        },
      },
      fontFamily: {
        pretendard: ["Pretendard", "-apple-system", "BlinkMacSystemFont", "system-ui", "Roboto", "sans-serif"],
      },
      boxShadow: {
        'gem-soft': '0 4px 20px -2px rgba(15, 23, 42, 0.06)',
        'gem-hover': '0 12px 30px -4px rgba(0, 82, 204, 0.12)',
        'gem-floating': '0 16px 36px -6px rgba(7, 30, 84, 0.14)',
        'gem-sticky': '0 10px 25px -3px rgba(7, 30, 84, 0.15)',
      },
    },
  },
  plugins: [],
};
export default config;
