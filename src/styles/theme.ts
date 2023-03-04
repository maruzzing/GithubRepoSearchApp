import { DefaultTheme, css } from 'styled-components/native';

const space = {
  layout: 20,
  scale: (value: number) => 8 * value,
};

const color = {
  background: '#f7f7f9',
  cardBackground: '#ffffff',
  white: '#ffffff',
  black: '#323232',
  primary: '#3D58C1',
  mono1: '#323232',
  mono2: '#4E5968',
  mono3: '#B0B8C1',
};

const typography = {
  title: css`
    font-size: 32px;
    font-weight: 600;
  `,
  subtitle1: css`
    font-size: 24px;
    font-weight: 500;
  `,
  subtitle2: css`
    font-size: 16px;
    font-weight: 500;
  `,
  body1: css`
    font-size: 16px;
    font-weight: 400;
  `,
  body2: css`
    font-size: 14px;
    font-weight: 400;
  `,
  caption: css`
    font-size: 12px;
    font-weight: 400;
  `,
  button: css`
    font-size: 14px;
    font-weight: 500;
  `,
};

export type SpaceType = typeof space;
export type ColorType = typeof color;
export type TypographyType = typeof typography;

const theme: DefaultTheme = {
  color,
  space,
  typography,
};

export default theme;
