/** @type {import('tailwindcss').Config} */
module.exports = {
  // add daisyUI plugin
  plugins: [require('daisyui')],

  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
    ], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: 'dark', // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // daisyui使うなら↓この設定はしてはいけない
  // theme: {
  //   extend: {
  //     // colors: {
  //     //   'accent-1': '#FAFAFA',
  //     //   'accent-2': '#EAEAEA',
  //     //   'accent-7': '#333',
  //     //   success: '#0070f3',
  //     //   cyan: '#79FFE1',
  //     // },
  //     // spacing: {
  //     //   28: '7rem',
  //     // },
  //     // letterSpacing: {
  //     //   tighter: '-.04em',
  //     // },
  //     // lineHeight: {
  //     //   tight: 1.2,
  //     // },
  //     // fontSize: {
  //     //   '5xl': '2.5rem',
  //     //   '6xl': '2.75rem',
  //     //   '7xl': '4.5rem',
  //     //   '8xl': '6.25rem',
  //     // },
  //     // boxShadow: {
  //     //   sm: '0 5px 10px rgba(0, 0, 0, 0.12)',
  //     //   md: '0 8px 30px rgba(0, 0, 0, 0.12)',
  //     // },
  //   },
  // },
  // plugins: [],
};
