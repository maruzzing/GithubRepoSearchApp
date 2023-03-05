import { forwardRef, useCallback, useImperativeHandle } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import RepositoryItem from '@/components/RepositoryItem';
import Spinner from '@/components/common/Spinner';
import Divider from '@/components/common/Divider';
import Text from '@/components/common/Text';

import useInfiniteFetchApi from '@/hooks/useInfiniteFetchApi';

import { Repository } from '@/types';

import { PER_PAGE } from '@/services/constants';

import { RootStackParamList } from '@/navigation/RootNavigation';

const NextPageSpinner = styled(Spinner)`
  margin-vertical: ${props => props.theme.space.scale(2)}px;
`;

const StyledSpinner = styled(Spinner)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const EmptyContainer = styled.View`
  align-items: center;
  padding: ${props => props.theme.space.scale(4)}px;
`;

const SEARCH_API_CONFIG = {
  url: '/search/repositories',
  params: {
    per_page: PER_PAGE,
  },
};

export type SearchResultRef = { search: (q: string) => void };

const SearchResult = forwardRef<SearchResultRef, { searched: boolean }>(({ searched }, ref) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { bottom: paddingBottom } = useSafeAreaInsets();

  const { state, setApiConfig, fetchNextPage } = useInfiniteFetchApi({
    formatData: (d: { items: Array<Repository>; total_count: number }) => ({ data: d.items, count: d.total_count }),
  });

  useImperativeHandle(ref, () => ({
    search: (q: string) => {
      setApiConfig({ ...SEARCH_API_CONFIG, params: { ...SEARCH_API_CONFIG.params, q, page: 1 } });
    },
  }));

  const renderItem = useCallback(({ item }: { item: Repository }) => {
    return <RepositoryItem onPress={() => navigation.navigate('RepoDetail', { item })} item={item} />;
  }, []);

  const ListFooterComponent = useCallback(() => {
    if (state.loadingNextPage) return <NextPageSpinner />;
    return null;
  }, [state.loadingNextPage]);

  const ListEmptyComponent = useCallback(() => {
    if (state.loading) return null;
    return (
      <EmptyContainer>
        <Text typography="subtitle2">검색 결과가 없어요</Text>
      </EmptyContainer>
    );
  }, [state.loading]);

  if (!searched) return null;
  return (
    <>
      <FlatList
        contentContainerStyle={{ flexGrow: 1, paddingBottom }}
        data={state.data}
        renderItem={renderItem}
        keyExtractor={(item: Repository, idx: number) => item.node_id + '-' + idx}
        onEndReached={fetchNextPage}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={ListEmptyComponent}
        ItemSeparatorComponent={Divider}
      />
      {state.loading && <StyledSpinner />}
    </>
  );
});

export default SearchResult;
