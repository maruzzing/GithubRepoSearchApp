import { useCallback, useMemo } from 'react';
import { FlatList } from 'react-native';
import { useTheme } from 'styled-components';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { RootStackParamList } from '@/navigation/RootNavigation';

import PageTemplate from '@/components/layout/PageTemplate';
import RepositoryItem from '@/components/RepositoryItem';
import IssueItem from '@/components/IssueItem';
import Divider from '@/components/common/Divider';
import Spinner from '@/components/common/Spinner';
import Text from '@/components/common/Text';

import useInfiniteFetchApi from '@/hooks/useInfiniteFetchApi';

import { PER_PAGE } from '@/services/constants';

import { Issue } from '@/types';

const NextPageSpinner = styled(Spinner)`
  margin-vertical: ${props => props.theme.space.scale(2)}px;
`;

const EmptyContainer = styled.View`
  align-items: center;
  padding: ${props => props.theme.space.scale(4)}px;
`;

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
  const { bottom: paddingBottom } = useSafeAreaInsets();
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

  const ListFooterComponent = useCallback(() => {
    if (state.loadingNextPage) return <NextPageSpinner />;
    return null;
  }, [state.loadingNextPage]);

  const ListEmptyComponent = useCallback(() => {
    if (state.loading) return null;
    return (
      <EmptyContainer>
        <Text typography="subtitle2">등록된 이슈가 없어요</Text>
      </EmptyContainer>
    );
  }, [state.loading]);

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
      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={{ flexGrow: 1, paddingBottom, backgroundColor: color.cardBackground }}
        data={state.data}
        renderItem={renderIssue}
        keyExtractor={item => item.node_id}
        onEndReached={fetchNextPage}
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={ListFooterComponent}
        bounces={false}
      />
      {state.loading && <StyledSpinner />}
    </PageTemplate>
  );
};

export default RepoDetail;
