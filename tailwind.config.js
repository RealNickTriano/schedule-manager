/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        entering: {
          '0%': { transform: 'opacity: 0', transform: 'scale(.25)' },
          '100%': { transform: 'opacity: 1', transform: 'scale(1)' }
        },
        leaving: {
          '0%': { transform: 'opacity: 1', transform: 'scale(1)' },
          '100%': { transform: 'opacity: 0', transform: 'scale(.25)' }
        }
      },
      animation: {
        entering: 'entering 0.1s ease-out 1',
        leaving: 'leaving 0.075s ease-in 1'
      }
    },
  },
  plugins: [],
}

Entering: "transition ease-out duration-100"
                        From: "transform opacity-0 scale-95"
                        To: "transform opacity-100 scale-100"
                        Leaving: "transition ease-in duration-75"
                        From: "transform opacity-100 scale-100"
                        To: "transform opacity-0 scale-95"