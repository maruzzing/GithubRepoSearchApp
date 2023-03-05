import { useCallback, useRef, useState } from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '@/navigation/RootNavigation';

import SearchTextInput, { SearchTextInputRef } from '@/components/common/SearchTextInput';
import BackButton from '@/components/common/AppBar/BackButton';
import SearchResult, { SearchResultRef } from '@/components/search/SearchResult';
import RecentKeywords from '@/components/search/RecentKeywords';

import { useAppDispatch } from '@/store';
import { updateSearchKeyword } from '@/store/reducers/searchSlice';

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${props => props.theme.color.background};
`;

const SearchContainer = styled.View`
  flex-direction: row;
  padding-horizontal: ${props => props.theme.space.layout}px;
  padding-vertical: ${props => props.theme.space.scale(2)}px;
  align-items: center;
`;

const InputContainer = styled.View`
  flex: 1;
`;

const StyledBackButton = styled(BackButton)`
  margin-right: ${props => props.theme.space.scale(1)}px;
`;

export type SearchScreenProps = StackScreenProps<RootStackParamList, 'Search'>;

const Search = () => {
  const { top: paddingTop } = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const searchResultViewRef = useRef<SearchResultRef>(null);
  const searchInputRef = useRef<SearchTextInputRef>(null);

  const [searched, setSearched] = useState(false);

  const handleSearch = useCallback((q: string) => {
    setSearched(true);
    searchResultViewRef.current?.search(q);
    searchInputRef.current?.setValue(q);
    dispatch(updateSearchKeyword({ type: 'add', keyword: q }));
  }, []);

  const onSubmit = useCallback((q: string) => {
    q = q.trim();
    if (!q) return;
    handleSearch(q);
  }, []);

  const handleChangeText = useCallback(() => {
    if (searched) setSearched(!searched);
  }, [searched]);

  return (
    <Container style={{ paddingTop }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <SearchContainer>
        <StyledBackButton />
        <InputContainer pointerEvents="box-none">
          <SearchTextInput
            placeholder="깃헙 레포지토리 검색"
            onSubmit={onSubmit}
            autoFocus
            onChangeText={handleChangeText}
            ref={searchInputRef}
          />
        </InputContainer>
      </SearchContainer>
      <SearchResult ref={searchResultViewRef} searched={searched} />
      {!searched && <RecentKeywords onPressItem={handleSearch} />}
    </Container>
  );
};

export default Search;
