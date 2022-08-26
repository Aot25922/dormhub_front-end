const colors = require('tailwindcss/colors')

module.exports = {
	purge: [],
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
			'dark-blue': '#131316',
			'dark-gray': '#1F1F29',
			'gray-soil': '#545762',
			'light-blue': '#B9C1D9',
			'cream': {
				'lightest': '#FEFAE0',
				'lighter': '#FCF4D7',
				'light': '#FAEDCD',
				'DEFAULT': '#E7C8A0',
				'dark': '#DEB68A',
				'darker': '#D4A373'
			},
			'green': {
				'light': '#F4F4D5',
				'DEFAULT': '#E9EDC9',
				'dark': '#DBE1BC',
				'darker': '#CCD5AE'
			},
      'imperialRed': '#E63946',
      'HoneyDew': '#F1FAEE',
      'powderBlue': '#A8DADC',
      'celadonBlue': '#457B9D',
      'PrussianBlue': '#1D3557',
      'ghostWhite': '#F2F3F8',
			'confirmButton' : 'rgb(16 185 129)',
			'cancelButton':'rgb(190 18 60)'
		},
		extend: {},
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

          'accent': '#E63946',            /* Accent color */
          'accent-focus': '#C81927',      /* Accent color - focused */
          'accent-content': '#FFFFFF',    /* Foreground content color to use on accent color */

          'neutral': '#FFFFFF',           /* Neutral color */
          'neutral-focus': '#F5F5F5',     /* Neutral color - focused */
          'neutral-content': '#1D3557',   /* Foreground content color to use on neutral color */

          'info': '#2094f3',              /* Info */
          'success': '#009485',           /* Success */
          'warning': '#ff9900',           /* Warning */
          'error': '#ff5724',             /* Error */
				},
			}
		],
	},
}
