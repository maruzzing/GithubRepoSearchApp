import { useMemo } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';

import TouchableHighlight, { TouchableHighlightProps } from '@/components/common/TouchableHighlight';
import Profile from '@/components/common/Profile';
import Text from '@/components/common/Text';

import type { Repository } from '@/types';

import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { addRepository, removeRepository } from '@/store/reducers/repositorySlice';

interface RepositoryItemProps extends TouchableHighlightProps {
  item: Repository;
  isListItem?: boolean;
}

const Name = styled(Text)`
  margin-top: ${props => props.theme.space.scale(0.5)}px;
`;

const Description = styled(Text)<Pick<RepositoryItemProps, 'isListItem'>>`
  margin-top: ${props => props.theme.space.scale(props.isListItem ? 0.5 : 1.5)}px;
`;

const Container = styled(TouchableHighlight).attrs<Pick<RepositoryItemProps, 'isListItem'>>(({ isListItem }) => ({
  as: isListItem ? TouchableHighlight : View,
}))<Pick<RepositoryItemProps, 'isListItem'>>`
  background-color: ${props => props.theme.color[props.isListItem ? 'cardBackground' : 'background']};
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

const RepositoryItem = ({ item, isListItem = true, ...props }: RepositoryItemProps) => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state: RootState) => state.repositories);

  const isBookmarked = useMemo(() => data.some((d: Repository) => d.node_id === item.node_id), [data]);

  const handlePressBookmark = () => {
    dispatch(isBookmarked ? removeRepository(item) : addRepository(item));
  };

  return (
    <Container isListItem={isListItem} {...props}>
      <>
        <ProfileRow>
          <Profile source={{ uri: item.owner.avatar_url }} name={item.owner.login} />
          <BookmarkButton onPress={handlePressBookmark}>
            <BookmarkIcon name={isBookmarked ? 'bookmark' : 'bookmark-outline'} size={24} />
          </BookmarkButton>
        </ProfileRow>
        <Name typography={isListItem ? 'subtitle2' : 'subtitle1'} numberOfLines={2}>
          {item.name}
        </Name>
        <Description typography={isListItem ? 'body2' : 'body1'} numberOfLines={3} isListItem={isListItem}>
          {item.description}
        </Description>
      </>
    </Container>
  );
};

export default RepositoryItem;
