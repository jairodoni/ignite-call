import { globalCss } from '@donecode-ignite-ui/react'

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    padding: 0,
    margin: 0,
  },

  body: {
    backgroundColor: '$gray900',
    color: '$gray100',
    '-webkit-font-smoothing': 'antialiased',
  },

  '::-webkit-scrollbar': {
    width: '1px',
  },

  /* Track */
  '::-webkit-scrollbar-track': {
    background: '$gray800',
  },

  /* Handle */
  '::-webkit-scrollbar-thumb': {
    background: '$gray400',
    borderRadius: '8px',
  },
})
