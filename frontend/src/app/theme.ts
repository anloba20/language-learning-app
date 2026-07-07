import { createTheme } from '@mantine/core'

export const theme = createTheme({
  primaryColor: 'violetPink',
  fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  headings: {
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontWeight: '800',
  },
  defaultRadius: 'md',
  colors: {
    violetPink: [
      '#fff4ff',
      '#fde4fb',
      '#fac5f5',
      '#f79fed',
      '#ee75e5',
      '#df57df',
      '#cb51e4',
      '#a936bf',
      '#872b9b',
      '#672274',
    ],
  },
})
