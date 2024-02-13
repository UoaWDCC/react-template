export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('daisyui')],
  theme: {
    extends: {
      fontFamily: {
        sans: ['Montserrat'],
        body: ['Open Sans'],
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          primary: '#183249',
          accent: '#087df1',
          'base-100': '#E6E9F1',
        },
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: '#183249',
          accent: '#087df1',
          'base-100': '#282c34',
        },
      },
    ],
  },
};
