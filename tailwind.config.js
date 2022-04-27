module.exports = {
  purge: [],
  theme: {
    colors:{
      'cheese': '#FF6000',
      'dark-blue': '#131316',
      'dark-gray': '#1F1F29',
      'gray-soil': '#545762',
      'light-blue': '#B9C1D9',
      'white': '#ffffff',
      'black': '#000000'
      },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
      'mytheme': {                          /* your theme name */
        'primary' : '#131316',           /* Primary color */
        'primary-focus' : '#1F1F29',     /* Primary color - focused */
        'primary-content' : '#ffffff',   /* Foreground content color to use on primary color */

        'secondary' : '#1F1F29',         /* Secondary color */
        'secondary-focus' : '#545762',   /* Secondary color - focused */
        'secondary-content' : '#ffffff', /* Foreground content color to use on secondary color */

        'accent' : '#FF6000',            /* Accent color */
        'accent-focus' : '#FF873F',      /* Accent color - focused */
        'accent-content' : '#000000',    /* Foreground content color to use on accent color */

        'neutral' : '#545762',           /* Neutral color */
        'neutral-focus' : '#B9C1D9',     /* Neutral color - focused */
        'neutral-content' : '#ffffff',   /* Foreground content color to use on neutral color */

        'base-100' : '#ffffff',          /* Base color of page, used for blank backgrounds */
        'base-200' : '#f9fafb',          /* Base color, a little darker */
        'base-300' : '#d1d5db',          /* Base color, even more darker */
        'base-content' : '#000000',      /* Foreground content color to use on base color */

        'info' : '#2094f3',              /* Info */
        'success' : '#009485',           /* Success */
        'warning' : '#ff9900',           /* Warning */
        'error' : '#ff5724',             /* Error */
     },
    }
    ],
  },
}
