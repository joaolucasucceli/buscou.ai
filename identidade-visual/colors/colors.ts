/**
 * buscou.ai design tokens — colors
 * Tipado e readonly para consumo seguro em TS/React.
 */

export const colors = {
  bg: {
    base:   '#08090D',
    elev1:  '#0F1117',
    elev2:  '#161823',
    elev3:  '#1C1F2C',
  },
  border: {
    default: '#1F2230',
    strong:  '#2E3142',
  },
  text: {
    primary:      '#ECEDF0',
    secondary:    '#A4A7B3',
    tertiary:     '#6B6E7B',
    quaternary:   '#4A4D5A',
  },
  brand: {
    default: '#7C5CFF',
    600:     '#6D4CF0',
    300:     '#A88FFF',
    100:     '#E4DEFF',
    soft:    'rgba(124, 92, 255, 0.12)',
  },
  ai: {
    default: '#00E5A0',
    300:     '#57F0C0',
    dark:    '#00B37A',
    soft:    'rgba(0, 229, 160, 0.08)',
    glow:    'rgba(0, 229, 160, 0.45)',
  },
  feedback: {
    coral:   '#FF6B3D',
    warn:    '#FFB84D',
    success: '#00E5A0',
  },
} as const;

export type Colors = typeof colors;
export default colors;
