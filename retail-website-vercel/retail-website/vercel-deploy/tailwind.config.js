module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8b2942',
        secondary: '#e0a0b0',
        background: {
          DEFAULT: '#121212',
          secondary: '#1e1e1e',
          tertiary: '#2a2a2a',
        },
      },
    },
  },
  plugins: [],
}
