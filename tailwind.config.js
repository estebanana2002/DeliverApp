/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#111111',
        secondary: '#2F2F2F',
        tertiary: '#F2EFE6',
        egg: {
          'DEFAULT': '#FFCB74', // Color por defecto
          '100': '#ffe0ab',
          '200': '#ffda9b',
          '300': '#ffd58d',
          '400': '#ffcf7b',
          '500': '#FFCB74', // color original
          '600': '#ffc766',
          '700': '#fdc058',
          '800': '#ffb940',
          '900': '#ffb129',
        },
        bone: '#F6F6F6'
      },
      fontFamily: {
        'sans': ['Anta', 'sans-serif'],
        'serif': ['Anta', 'serif'],
        'mono': ['Anta', 'monospace'],
      },
      fontWeight: {
        'light': 300, // Peso ligero
        'normal': 400, // Peso normal
        'medium': 500, // Peso medio
        'semibold': 600, // Semibold (semi-negrita)
        'bold': 700, // Negrita
        'extrabold': 800, // Extra negrita
        'black': 900, // Negro (máxima negrita)
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-0.3deg)' },
          '50%': { transform: 'rotate(0.3deg)' },
        }
      },
    },
  },
  plugins: [],
}

