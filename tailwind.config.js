/** @type {import('tailwindcss').Config} */
module.exports = {
  // add daisyUI plugin
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
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

  theme: {
    extend: {
      animation: {
        'slide-in-blurred-top':
          'slide-in-blurred-top 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000)   both',
        'slide-out-blurred-top':
          'slide-out-blurred-top 0.45s cubic-bezier(0.895, 0.030, 0.685, 0.220)   both',
        'slide-in-blurred-right':
          'slide-in-blurred-right 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000)   both',
        'text-focus-in':
          'text-focus-in 1s cubic-bezier(0.550, 0.085, 0.680, 0.530)   both',
        'text-pop-up-top':
          'text-pop-up-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both',
        'tracking-out-contract':
          'tracking-out-contract 0.8s cubic-bezier(0.550, 0.085, 0.680, 0.530)   both',
        'tracking-in-expand':
          'tracking-in-expand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000)   both',
      },
      keyframes: {
        'slide-in-blurred-top': {
          '0%': {
            transform: 'translateY(-1000px) scaleY(2.5) scaleX(.2)',
            'transform-origin': '50% 0%',
          },
          to: {
            transform: 'translateY(0) scaleY(1) scaleX(1)',
            'transform-origin': '50% 50%',
          },
        },
        'slide-out-blurred-top': {
          '0%': {
            transform: 'translateY(0) scaleY(1) scaleX(1)',
            'transform-origin': '50% 0%',
            filter: 'blur(0)',
            opacity: '1',
          },
          to: {
            transform: 'translateY(-1000px) scaleY(2) scaleX(.2)',
            'transform-origin': '50% 0%',
            filter: 'blur(40px)',
            opacity: '0',
          },
        },
        'slide-in-blurred-right': {
          '0%': {
            transform: 'translateX(1000px) scaleX(2.5) scaleY(.2)',
            'transform-origin': '0% 50%',
            filter: 'blur(40px)',
            opacity: '0',
          },
          to: {
            transform: 'translateX(0) scaleY(1) scaleX(1)',
            'transform-origin': '50% 50%',
            filter: 'blur(0)',
            opacity: '1',
          },
        },
        'text-focus-in': {
          '0%': {
            filter: 'blur(12px)',
            opacity: '0',
          },
          to: {
            filter: 'blur(0)',
            opacity: '1',
          },
        },
        'text-pop-up-top': {
          '0%': {
            transform: 'translateY(0)',
            'transform-origin': '50% 50%',
            'text-shadow': 'none',
          },
          to: {
            transform: 'translateY(-50px)',
            'transform-origin': '50% 50%',
            'text-shadow':
              '0 1px 0 #222, 0 2px 0 #222, 0 3px 0 #222, 0 4px 0 #222, 0 5px 0 #222, 0 6px 0 #222, 0 7px 0 #222, 0 8px 0 #222, 0 9px 0 #222, 0 50px 30px rgba(0, 0, 0, .3)',
          },
        },
        'tracking-out-contract': {
          '0%,50%': {
            opacity: '1',
          },
          to: {
            'letter-spacing': '-.5em',
            opacity: '0',
          },
        },
        'tracking-in-expand': {
          '0%': {
            'letter-spacing': '-.5em',
            opacity: '0',
          },
          '40%': {
            opacity: '.6',
          },
          to: {
            opacity: '1',
          },
        },
      },
    },
  },
};
