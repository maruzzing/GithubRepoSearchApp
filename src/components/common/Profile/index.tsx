import { ViewProps } from 'react-native/types';
import styled from 'styled-components/native';

import Avatar, { AvatarProps } from '@/components/common/Avatar';
import Text from '@/components/common/Text';

interface ProfileProps extends Pick<AvatarProps, 'size' | 'source'> {
  name: string;
  containerStyle?: ViewProps['style'];
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StyledAvatar = styled(Avatar)`
  margin-right: ${props => props.theme.space.scale(1 / 2)}px;
`;

const Profile = ({ size = 20, name, source, containerStyle }: ProfileProps) => {
  return (
    <Container style={containerStyle}>
      <StyledAvatar size={size} source={source} />
      <Text typography="body2" color="mono2">
        {name}
      </Text>
    </Container>
  );
};

export default Profile;
