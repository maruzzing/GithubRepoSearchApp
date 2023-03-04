import { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '@/navigation/RootNavigation';

import SearchTextInput from '@/components/common/SearchTextInput';
import BackButton from '@/components/common/AppBar/BackButton';
import RepositoryItem from '@/components/RepositoryItem';
import Spinner from '@/components/common/Spinner';
import Divider from '@/components/common/Divider';

import useInfiniteFetchApi from '@/hooks/useInfiniteFetchApi';

import { Repository } from '@/types';

import { SEARCH_LIMIT } from '@/services/constants';

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

const StyledSpinner = styled(Spinner)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const NextPageSpinner = styled(Spinner)`
  margin-vertical: ${props => props.theme.space.scale(2)}px;
`;

export type SearchScreenProps = StackScreenProps<RootStackParamList, 'Search'>;

const SEARCH_API_CONFIG = {
  url: '/search/repositories',
  params: {
    per_page: SEARCH_LIMIT,
  },
};

const Search = ({ navigation }: SearchScreenProps) => {
  const { top: paddingTop, bottom: paddingBottom } = useSafeAreaInsets();

  const { state, setApiConfig, fetchNextPage } = useInfiniteFetchApi({
    formatData: (d: { items: Repository; total_count: number }) => ({ data: d.items, count: d.total_count }),
  });

  const renderItem = useCallback(({ item }: { item: Repository }) => {
    return (
      <RepositoryItem
        onPress={() => navigation.navigate('RepoDetail', { repo: item.name, owner: item.owner.login })}
        name={item.name}
        owner={item.owner}
        description={item.description}
        isBookmarked={false}
      />
    );
  }, []);

  const handleSearch = (q: string) => {
    q = q.trim();
    if (!q) return;
    setApiConfig({ ...SEARCH_API_CONFIG, params: { ...SEARCH_API_CONFIG.params, q, page: 1 } });
  };

  const ListFooterComponent = () => {
    if (state.loadingNextPage) return <NextPageSpinner />;
    return null;
  };

  return (
    <Container style={{ paddingTop }}>
      <SearchContainer>
        <StyledBackButton />
        <InputContainer pointerEvents="box-none">
          <SearchTextInput onSubmit={handleSearch} />
        </InputContainer>
      </SearchContainer>
      <FlatList
        contentContainerStyle={{ flexGrow: 1, paddingBottom }}
        data={state.data}
        renderItem={renderItem}
        keyExtractor={(item: Repository, idx: number) => item.node_id + '-' + idx}
        onEndReached={fetchNextPage}
        ListFooterComponent={ListFooterComponent}
        ItemSeparatorComponent={Divider}
      />
      {state.loading && <StyledSpinner />}
    </Container>
  );
};

export default Search;
