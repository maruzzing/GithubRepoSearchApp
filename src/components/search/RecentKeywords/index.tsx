import { useCallback } from 'react';
import styled from 'styled-components/native';
import { Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import TouchableHighlight from '@/components/common/TouchableHighlight';
import Text from '@/components/common/Text';
import InfiniteScrollFlatList from '@/components/layout/InfiniteScrollFlatList';

import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { updateSearchKeyword } from '@/store/reducers/searchSlice';

const Title = styled(Text)`
  margin-top: ${props => props.theme.space.scale(1)}px;
  margin-bottom: ${props => props.theme.space.scale(2)}px;
  margin-horizontal: ${props => props.theme.space.layout}px;
`;

const KeywordItem = styled(TouchableHighlight)`
  padding-horizontal: ${props => props.theme.space.layout}px;
  padding-vertical: ${props => props.theme.space.scale(2)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Keyword = styled(Text)`
  flex: 1;
  margin-right: ${props => props.theme.space.scale(1)}px;
`;

const RecentKeywords = ({ onPressItem }: { onPressItem: (q: string) => void }) => {
  const dispatch = useAppDispatch();

  const { recentSearchKeywords } = useAppSelector((state: RootState) => state.search);

  const renderItem = useCallback(({ item }: { item: string }) => {
    const handlePressDelete = () => dispatch(updateSearchKeyword({ type: 'delete', keyword: item }));
    return (
      <KeywordItem onPress={() => onPressItem(item)}>
        <>
          <Keyword numberOfLines={1} typography="body1">
            {item}
          </Keyword>
          <Pressable hitSlop={8} onPress={handlePressDelete}>
            <Icon name="close" size={16} />
          </Pressable>
        </>
      </KeywordItem>
    );
  }, []);

  const ListHeaderComponent = () => {
    return <Title typography="subtitle1">최근 검색어</Title>;
  };

  return (
    <InfiniteScrollFlatList
      data={recentSearchKeywords}
      renderItem={renderItem}
      keyExtractor={item => item}
      ListHeaderComponent={recentSearchKeywords.length && ListHeaderComponent}
    />
  );
};

export default RecentKeywords;
