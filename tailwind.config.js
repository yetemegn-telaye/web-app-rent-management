/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E6F0F0',  // Teal-like primary color
          light: '#E6F0F0',    // Lighter shade of the primary color
          dark: '#115E59',     // Darker shade of the primary color
        },
        secondary: {
          DEFAULT: '#076D6D',  // Orange-like secondary color
          light: '#E6822E',    // Lighter shade of the secondary color
          dark: '#032E2E',     // Darker shade of the secondary color
        },
        accent: {
          DEFAULT: '#808080',  // Blue-like accent color
        },
        success: '#10B981',     // Green color for success messages
        warning: '#F59E0B',     // Yellow color for warning messages
        danger: '#EF4444',      // Red color for error messages
      },

      fontFamily: {
        'montserrat': ['Montserrat'],
    }
    },
  },
  plugins: [],
}
