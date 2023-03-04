import { PropsWithChildren } from 'react';
import { ViewStyle } from 'react-native/types';
import styled from 'styled-components/native';

const StyledCard = styled.View`
  background-color: ${props => props.theme.color.cardBackground};
  padding: ${props => props.theme.space.scale(2)}px;
  border-radius: ${props => props.theme.space.scale(1)}px;
`;

const Card = ({ children, style }: PropsWithChildren<{ style?: ViewStyle }>) => {
  return <StyledCard style={style}>{children}</StyledCard>;
};

export default Card;
