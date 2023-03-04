import styled from 'styled-components/native';

import TouchableHighlight, { TouchableHighlightProps } from '@/components/common/TouchableHighlight';
import Profile from '@/components/common/Profile';
import Text from '@/components/common/Text';

import type { Repository } from '@/types';

interface RepositoryItemProps extends Pick<Repository, 'name' | 'owner' | 'description'>, TouchableHighlightProps {
  isBookmarked: boolean;
}

const StyledText = styled(Text)`
  margin-top: ${props => props.theme.space.scale(0.5)}px;
`;

const Container = styled(TouchableHighlight)`
  background-color: ${props => props.theme.color.cardBackground};
  padding: ${props => props.theme.space.scale(2)}px;
`;

const RepositoryItem = ({ name, owner, description, isBookmarked, ...props }: RepositoryItemProps) => {
  return (
    <Container {...props}>
      <>
        <Profile source={{ uri: owner.avatar_url }} name={owner.login} />
        <StyledText typography="subtitle2" numberOfLines={2}>
          {name}
        </StyledText>
        <StyledText typography="body2" numberOfLines={3}>
          {description}
        </StyledText>
      </>
    </Container>
  );
};

export default RepositoryItem;
