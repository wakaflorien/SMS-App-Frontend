/** @type {import('tailwindcss').Config} */
// const withMT = require('@material-tailwind/react/utils/withMT')
import withMT from '@material-tailwind/react/utils/withMT';

module.exports = withMT({
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    colors: {
      primary: '#90C126',
      secondary: '#F7FFE7',
    },
    extend: {
      fontFamily: {
        poppnis: ["'Poppins', sans-serif;"],
      },
      backgroundImage: {
        header: "url(/images/header.jpg)"
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
})
