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
    font-family: NotoSansKR-Bold;
  `,
  subtitle1: css`
    font-size: 24px;
    font-family: NotoSansKR-Medium;
  `,
  subtitle2: css`
    font-size: 16px;
    font-family: NotoSansKR-Medium;
  `,
  body1: css`
    font-size: 16px;
    font-family: NotoSansKR-Regular;
  `,
  body2: css`
    font-size: 14px;
    font-family: NotoSansKR-Regular;
  `,
  caption: css`
    font-size: 12px;
    font-family: NotoSansKR-Regular;
  `,
  button: css`
    font-size: 14px;
    font-family: NotoSansKR-Medium;
  `,
};

export type SpaceType = typeof space;
export type ColorType = typeof color;
export type TypographyType = typeof typography;
export type TypographyVariantsType = keyof TypographyType;

const theme: DefaultTheme = {
  color,
  space,
  typography,
};

export default theme;
