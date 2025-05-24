module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        domine: ['Domine', 'serif'],
      },
      colors: {
        brand: {
          DEFAULT: "#1e293b",
          light: "#334155",
          dark: "#0f172a",
          accent: "#38bdf8",
          primary: "#F7F1D5",
          secondary: "#645933",
          dark: "#070709",
          gray: "#3E413C",
          success: "#7CA81F", // usa success para btn-success
          error: "#B42e33"
          
        },
        neutral: {
          50: "#f9fafb",
          100: "#f3f4f6",
          900: "#111827",
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#F7F1D5",
          secondary: "#645933",
          dark: "#070709",
          gray: "#3E413C",
          success: "#7CA81F", // usa success para btn-success
          error: "#B42e33"
        },
      },
    ],
  },
}
