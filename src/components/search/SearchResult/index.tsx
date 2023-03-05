import { forwardRef, useCallback, useImperativeHandle } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import RepositoryItem from '@/components/RepositoryItem';
import InfiniteScrollFlatList from '@/components/layout/InfiniteScrollFlatList';

import useInfiniteFetchApi from '@/hooks/useInfiniteFetchApi';

import { Repository } from '@/types';

import { PER_PAGE } from '@/services/constants';

import { RootStackParamList } from '@/navigation/RootNavigation';

const SEARCH_API_CONFIG = {
  url: '/search/repositories',
  params: {
    per_page: PER_PAGE,
  },
};

export type SearchResultRef = { search: (q: string) => void };

const SearchResult = forwardRef<SearchResultRef, { searched: boolean }>(({ searched }, ref) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

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

  if (!searched) return null;
  return (
    <InfiniteScrollFlatList
      {...state}
      renderItem={renderItem}
      keyExtractor={(item: Repository, idx: number) => item.node_id + '-' + idx}
      onEndReached={fetchNextPage}
    />
  );
});

export default SearchResult;
