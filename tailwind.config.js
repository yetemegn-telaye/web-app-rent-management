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
        sans: ["Inter", "sans-serif"],
        
       
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0', transform: 'translateY(10px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
      slideInRight: {
        '0%': { transform: 'translateX(100%)' },
        '100%': { transform: 'translateX(0)' },
      },
      slideUp: {
        '0%': { transform: 'translateY(20px)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' },
      },
    },
    animation: {
      fadeIn: 'fadeIn 0.8s ease-out forwards',
      slideInRight: 'slideInRight 1s ease-out forwards',
      slideUp: 'slideUp 0.8s ease-out forwards',
    },
    
    },
    
  },
  
  plugins: [],
}
