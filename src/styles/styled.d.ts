import 'styled-components/native';
import { SpaceType, ColorType, TypographyType } from '@/styles/theme';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    space: SpaceType;
    color: ColorType;
    typography: TypographyType;
  }
}
