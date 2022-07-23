module.exports = {
	purge: [],
	theme: {
		colors: {
			'cheese': '#FF6000',
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
			'white': '#ffffff',
			'black': '#000000',
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
				'mytheme': {                          /* your theme name */
					'primary': '#D4A373',           /* Primary color */
					'primary-focus': '#E7C8A0',     /* Primary color - focused */
					'primary-content': '#000000',   /* Foreground content color to use on primary color */

					'secondary': '#FCF4D7',         /* Secondary color */
					'secondary-focus': '#E7C8A0',   /* Secondary color - focused */
					'secondary-content': '#545762', /* Foreground content color to use on secondary color */

					'accent': '#DBE1BC',            /* Accent color */
					'accent-focus': '#F4F4D5',      /* Accent color - focused */
					'accent-content': '#000000',    /* Foreground content color to use on accent color */

					'neutral': '#D4A373',           /* Neutral color */
					'neutral-focus': '#FAEDCD',     /* Neutral color - focused */
					'neutral-content': '#000000',   /* Foreground content color to use on neutral color */

					'info': '#2094f3',              /* Info */
					'success': '#009485',           /* Success */
					'warning': '#ff9900',           /* Warning */
					'error': '#ff5724',             /* Error */
				},
			}
		],
	},
}
