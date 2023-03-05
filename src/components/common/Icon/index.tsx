import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

import { ColorVariantsType } from '@/styles/theme';

interface IconProps extends React.ComponentProps<typeof Ionicons> {
  color?: ColorVariantsType;
}

const Icon = styled(Ionicons)<IconProps>`
  color: ${props => (props.color ? props.theme.color[props.color] : props.theme.color.mono1)};
`;

export default Icon;
