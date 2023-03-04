import { PropsWithChildren } from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import styled from 'styled-components/native';

import type { TypographyVariantsType } from '@/styles/theme';

interface TextProps extends RNTextProps {
  variants?: TypographyVariantsType;
}

const StyledText = styled(RNText)<TextProps>`
  ${props => (props.variants ? props.theme.typography[props.variants] : '')};
  include-font-padding: false;
`;

const Text = ({ children, ...props }: PropsWithChildren<TextProps>) => {
  return <StyledText {...props}>{children}</StyledText>;
};

export default Text;
