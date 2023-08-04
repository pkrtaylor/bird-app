/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bgImage': "url('https://9to5mac.com/wp-content/uploads/sites/6/2022/01/Twitter.jpg?quality=82&strip=all')",
      },
    },
  },
  plugins: [

    require("tailwind-scrollbar-hide")
  ],
}