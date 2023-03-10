import { Fragment, useCallback, useEffect } from 'react';
import { View, Pressable } from 'react-native';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';

import Icon from '@/components/common/Icon';
import Text from '@/components/common/Text';
import SearchTextInput from '@/components/common/SearchTextInput';
import Spinner from '@/components/common/Spinner';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Divider from '@/components/common/Divider';
import RepositoryItem from '@/components/RepositoryItem';
import PageTemplate from '@/components/layout/PageTemplate';

import { RootStackParamList } from '@/navigation/RootNavigation';

import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { getRepositories } from '@/store/reducers/repositorySlice';
import { getSearchKeywords } from '@/store/reducers/searchSlice';

import { Repository } from '@/types';

const ContentScrollView = styled.ScrollView``;

const PageTitle = styled(Text)`
  margin-bottom: ${props => props.theme.space.scale(2)}px;
`;

const TitleSection = styled.View`
  margin-bottom: ${props => props.theme.space.scale(4)}px;
`;

const Subtitle = styled(Text)`
  margin-bottom: ${props => props.theme.space.scale(2)}px;
`;

const StyledSpinner = styled(Spinner)`
  align-self: center;
  margin-vertical: ${props => props.theme.space.scale(3)}px;
`;

const EmptyMessageContainer = styled(Card)`
  align-items: center;
`;

const EmptyMessageButton = styled(Button)`
  margin-top: ${props => props.theme.space.scale(2)}px;
`;

const RepositoryContainer = styled.View`
  border-radius: ${props => props.theme.space.scale(1)}px;
  overflow: hidden;
`;

const EmptyText = styled(Text)`
  text-align: center;
`;

const ErrorIcon = styled(Icon)`
  margin-bottom: ${props => props.theme.space.scale(1)}px;
`;

export type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

const Home = ({ navigation }: HomeScreenProps) => {
  const { bottom: paddingBottom } = useSafeAreaInsets();
  const { data, loading, error } = useAppSelector((state: RootState) => state.repositories);
  const dispatch = useAppDispatch();

  const handlePressSearch = () => {
    navigation.navigate('Search');
  };

  const renderItem = useCallback(
    (item: Repository, index: number) => {
      return (
        <Fragment key={item.node_id}>
          {!!index && <Divider />}
          <RepositoryItem onPress={() => navigation.navigate('RepoDetail', { item })} item={item} />
        </Fragment>
      );
    },
    [data],
  );

  useEffect(() => {
    dispatch(getRepositories());
    dispatch(getSearchKeywords());
  }, []);

  const EmptyListComponent = () => {
    if (loading) {
      return <StyledSpinner />;
    } else {
      return (
        <EmptyMessageContainer>
          {error ? (
            <>
              <ErrorIcon name="sad-outline" size={32} />
              <EmptyText typography="body1">{'????????? ???????????????\n?????? ??? ?????? ????????? ?????????.'}</EmptyText>
            </>
          ) : (
            <>
              <EmptyText typography="body1">????????? ?????????????????? ?????????</EmptyText>
              <EmptyMessageButton priority="secondary" label="??????????????? ????????????" onPress={handlePressSearch} />
            </>
          )}
        </EmptyMessageContainer>
      );
    }
  };

  return (
    <PageTemplate>
      <ContentScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom }}>
        <TitleSection>
          <PageTitle typography="title">Home</PageTitle>
          <Pressable onPress={handlePressSearch}>
            <View pointerEvents="none">
              <SearchTextInput placeholder="?????? ??????????????? ??????" />
            </View>
          </Pressable>
        </TitleSection>
        <Subtitle typography="subtitle1">????????? ???????????????</Subtitle>
        <View>
          {!!data.length ? <RepositoryContainer>{data.map(renderItem)}</RepositoryContainer> : <EmptyListComponent />}
        </View>
      </ContentScrollView>
    </PageTemplate>
  );
};

export default Home;
