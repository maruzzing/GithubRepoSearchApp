import 'styled-components/native';
import type { SpaceType, ColorType, TypographyType, ElevationType } from '@/styles/theme';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    space: SpaceType;
    color: ColorType;
    typography: TypographyType;
    elevation: ElevationType;
  }
}
