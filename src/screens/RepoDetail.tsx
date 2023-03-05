import { useCallback, useMemo } from 'react';
import { useTheme } from 'styled-components';
import { StackScreenProps } from '@react-navigation/stack';
import styled from 'styled-components/native';

import { RootStackParamList } from '@/navigation/RootNavigation';

import PageTemplate from '@/components/layout/PageTemplate';
import RepositoryItem from '@/components/RepositoryItem';
import IssueItem from '@/components/IssueItem';
import Spinner from '@/components/common/Spinner';
import InfiniteScrollFlatList from '@/components/layout/InfiniteScrollFlatList';

import useInfiniteFetchApi from '@/hooks/useInfiniteFetchApi';

import { PER_PAGE } from '@/services/constants';

import { Issue } from '@/types';

const StyledSpinner = styled(Spinner)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

export type RepoDetailProps = StackScreenProps<RootStackParamList, 'RepoDetail'>;

const RepoDetail = ({ route, navigation }: RepoDetailProps) => {
  const {
    params: { item },
  } = route;
  const { color } = useTheme();

  const apiConfig = useMemo(
    () => ({
      url: `/repos/${item.owner.login}/${item.name}/issues`,
      params: {
        state: 'all',
        per_page: PER_PAGE,
      },
    }),
    [item],
  );

  const { state, fetchNextPage } = useInfiniteFetchApi({
    formatData: (d: Array<Issue>) => ({ data: d }),
    apiConfig: apiConfig,
  });

  const ListHeaderComponent = useCallback(() => <RepositoryItem item={item} isListItem={false} />, [item]);

  const renderIssue = useCallback(({ item: issue }: { item: Issue }) => {
    return (
      <IssueItem
        item={issue}
        onPress={() =>
          navigation.navigate('IssueDetail', {
            url: issue.html_url,
          })
        }
      />
    );
  }, []);

  return (
    <PageTemplate hasAppBar hasHistory>
      <InfiniteScrollFlatList
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={{ backgroundColor: color.cardBackground }}
        renderItem={renderIssue}
        keyExtractor={item => item.node_id}
        onEndReached={fetchNextPage}
        emptyMessage="등록된 이슈가 없어요"
        {...state}
      />
      {state.loading && <StyledSpinner />}
    </PageTemplate>
  );
};

export default RepoDetail;
