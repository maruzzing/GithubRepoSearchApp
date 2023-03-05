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
import useFetchApi from '@/hooks/useFetchApi';

import { PER_PAGE } from '@/services/constants';
import { getRepositoryDetail } from '@/services';

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
    formData: (d: Array<Issue>) => ({ data: d }),
    apiConfig: apiConfig,
  });

  const { state: repoDetailState } = useFetchApi({
    initialData: {},
    fetchApi: item.node_id ? undefined : () => getRepositoryDetail({ owner: item.owner.login, repo: item.name }),
  });

  const ListHeaderComponent = useCallback(() => {
    const repoDetail = item.node_id ? item : repoDetailState.data;
    if (!repoDetail.node_id) return null;

    return <RepositoryItem item={repoDetail} isListItem={false} />;
  }, [item, repoDetailState.data]);

  const renderIssue = useCallback(({ item: issue }: { item: Issue }) => {
    return (
      <IssueItem
        item={issue}
        onPress={() =>
          navigation.push('IssueDetail', {
            htmlUrl: issue.html_url,
            repositoryUrl: issue.repository_url,
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
      {(repoDetailState.loading || state.loading) && <StyledSpinner />}
    </PageTemplate>
  );
};

export default RepoDetail;
