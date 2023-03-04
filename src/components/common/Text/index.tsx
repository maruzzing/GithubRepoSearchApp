import { PropsWithChildren } from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import styled from 'styled-components/native';

import type { TypographyVariantsType, ColorVariantsType } from '@/styles/theme';

interface TextProps extends RNTextProps {
  typography?: TypographyVariantsType;
  color?: ColorVariantsType;
}

const StyledText = styled(RNText)<TextProps>`
  ${props => (props.typography ? props.theme.typography[props.typography] : '')};
  color: ${props => (props.color ? props.theme.color[props.color] : props.theme.color.mono1)};
  include-font-padding: false;
`;

const Text = ({ children, ...props }: PropsWithChildren<TextProps>) => {
  return <StyledText {...props}>{children}</StyledText>;
};

export default Text;
