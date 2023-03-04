import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

import TouchableHighlight, { TouchableHighlightProps } from '@/components/common/TouchableHighlight';
import Profile from '@/components/common/Profile';
import Text from '@/components/common/Text';

import type { Repository } from '@/types';

import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { addRepository, removeRepository } from '@/store/reducers/repositorySlice';
import { useMemo } from 'react';

interface RepositoryItemProps extends TouchableHighlightProps {
  item: Repository;
}

const StyledText = styled(Text)`
  margin-top: ${props => props.theme.space.scale(0.5)}px;
`;

const Container = styled(TouchableHighlight)`
  background-color: ${props => props.theme.color.cardBackground};
  padding: ${props => props.theme.space.scale(2)}px;
`;

const ProfileRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const BookmarkButton = styled.Pressable`
  margin-left: ${props => props.theme.space.scale(1)}px;
`;

const BookmarkIcon = styled(Icon)`
  color: ${props => props.theme.color.mono1};
`;

const RepositoryItem = ({ item, ...props }: RepositoryItemProps) => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state: RootState) => state.repositories);

  const isBookmarked = useMemo(() => data.some((d: Repository) => d.node_id === item.node_id), [data]);

  const handlePressBookmark = () => {
    dispatch(isBookmarked ? removeRepository(item) : addRepository(item));
  };

  return (
    <Container {...props}>
      <>
        <ProfileRow>
          <Profile source={{ uri: item.owner.avatar_url }} name={item.owner.login} />
          <BookmarkButton onPress={handlePressBookmark}>
            <BookmarkIcon name={isBookmarked ? 'bookmark' : 'bookmark-outline'} size={24} />
          </BookmarkButton>
        </ProfileRow>
        <StyledText typography="subtitle2" numberOfLines={2}>
          {item.name}
        </StyledText>
        <StyledText typography="body2" numberOfLines={3}>
          {item.description}
        </StyledText>
      </>
    </Container>
  );
};

export default RepositoryItem;
