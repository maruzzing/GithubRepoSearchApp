import styled from 'styled-components/native';

import TouchableHighlight, { TouchableHighlightProps } from '@/components/common/TouchableHighlight';
import Text from '@/components/common/Text';

interface ButtonProps extends TouchableHighlightProps {
  label: string;
  priority?: 'primary' | 'secondary';
}

const StyledButton = styled(TouchableHighlight)<Pick<ButtonProps, 'priority'>>`
  background-color: ${props => props.theme.color[props.priority === 'primary' ? 'primary' : 'background']};
  padding-horizontal: ${props => props.theme.space.scale(1.5)}px;
  padding-vertical: ${props => props.theme.space.scale(1.5)}px;
  border-radius: ${props => props.theme.space.scale(1)}px;
  align-items: center;
  width: 100%;
`;

const Button = ({ label, priority = 'primary', ...props }: ButtonProps) => {
  return (
    <StyledButton priority={priority} {...props}>
      <Text typography="button" color={priority === 'primary' ? 'white' : 'primary'}>
        {label}
      </Text>
    </StyledButton>
  );
};

export default Button;
