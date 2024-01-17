/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      minWidth: {
        '400px': '400px'
      },
      colors: {
        'wave-700': '#0C4A6E',
        'whitebright': '#F7F7FF',
        'whiteDark': 'darken(#F7F7FF, 70%)',
        'wave': {  DEFAULT: '#05A5ED',  50: '#ACE4FD',  100: '#98DEFD',  200: '#70D1FC',  300: '#48C4FB',  400: '#20B7FA',  500: '#05A5ED',  600: '#047FB6',  700: '#03587F',  800: '#023248',  900: '#000C11',  950: '#000000'},
        'amber': {  DEFAULT: '#FFBE0B',  50: '#FFEFC3',  100: '#FFE9AE',  200: '#FFDF85',  300: '#FFD45D',  400: '#FFC934',  500: '#FFBE0B',  600: '#D29A00',  700: '#9A7100',  800: '#624800',  900: '#2A1F00',  950: '#0E0A00'},
      },
    },
  },
}
