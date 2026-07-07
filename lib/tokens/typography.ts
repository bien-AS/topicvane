/** TopicVane type scale.
 *  Plus Jakarta Sans = headings/metrics/labels/buttons. Inter = body/data.
 *  Tabular numerals are mandatory on every figure. */

export const fonts = {
  heading: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
  body: "'Inter', ui-sans-serif, system-ui, sans-serif",
} as const

export const typeScale = {
  h1:        { font: 'heading', size: '1.75rem',   weight: 700, lineHeight: 1.2,  letterSpacing: '-0.02em' },
  h2:        { font: 'heading', size: '1.375rem',  weight: 700, lineHeight: 1.25, letterSpacing: '-0.01em' },
  h3:        { font: 'heading', size: '1.0625rem', weight: 600, lineHeight: 1.3 },
  metric:    { font: 'heading', size: '1.625rem',  weight: 700, lineHeight: 1.0,  tabular: true },
  bodyLg:    { font: 'body',    size: '0.9375rem', weight: 400, lineHeight: 1.6 },
  bodyMd:    { font: 'body',    size: '0.875rem',  weight: 400, lineHeight: 1.55 },
  bodySm:    { font: 'body',    size: '0.8125rem', weight: 400, lineHeight: 1.5 },
  data:      { font: 'body',    size: '0.8125rem', weight: 500, tabular: true },
  labelCaps: { font: 'heading', size: '0.6875rem', weight: 600, uppercase: true, letterSpacing: '0.05em' },
} as const

export type TypeToken = keyof typeof typeScale
