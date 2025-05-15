import colors from "tailwindcss/colors"
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
            secondary: {
                DEFAULT : colors.neutral[200], //default
                hover : colors.neutral[300], //hover
                border : colors.neutral[400], //border
                text : colors.neutral[500], //text
                dark : colors.neutral[800], //dark
                ["dark hover"] : colors.neutral[900] //dark hover
            },
        }
      },
    },
    plugins: [],
  }
  