import styled from 'styled-components/native';
import { ViewProps } from 'react-native';

const StyledDivider = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${props => props.theme.color.line};
`;

const Divider = ({ style }: { style?: ViewProps['style'] }) => {
  return <StyledDivider style={style} />;
};

export default Divider;
