/** @type {import('tailwindcss').Config} */
// const withMT = require('@material-tailwind/react/utils/withMT')
import withMT from '@material-tailwind/react/utils/withMT';

module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    colors: {
      primary: '#1a337b',
      secondary: '#eff0fc',
      tertiarry: "#475569",
    },
    extend: {
      fontFamily: {
        poppnis: ["'Poppins', sans-serif;"],
      },
      backgroundImage: {
        header: "url(/images/header.jpg)",
        helpcenter: "url(/images/help-center.jpg)",
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
})
