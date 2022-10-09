const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
	theme: {
		colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      'imperialRed': '#E63946',
      'HoneyDew': '#F1FAEE',
      'powderBlue': '#A8DADC',
      'celadonBlue': '#457B9D',
      'PrussianBlue': '#1D3557',
      'ghostWhite': '#F2F3F8',
		},
    fontFamily: {
      'Itim': 'Itim, cursive',
      'Kanit':'Kanit, sans-serif',
    },
	},
	variants: {
		extend: {},
	},
	plugins: [
		require("daisyui"),
		require('@tailwindcss/forms'),
		require('tw-elements/dist/plugin'),
	],
	daisyui: {
		themes: [
			{
				'mytheme': {
					'primary': '#1D3557',
					'primary-focus': '#457B9D',
					'primary-content': '#FFFFFF',

					'secondary': '#D3EDEE',
					'secondary-focus': '#98D5D7',
					'secondary-content': '#1D3557',

          'accent': '#E63946',
          'accent-focus': '#C81927',
          'accent-content': '#FFFFFF',

          'neutral': '#FFFFFF',
          'neutral-focus': '#F5F5F5',
          'neutral-content': '#1D3557',

          'info': '#2094f3',
          'success': '#009485',
          'warning': '#ff9900',
          'error': '#ff5724',
				},
			}
		],
	},
}
