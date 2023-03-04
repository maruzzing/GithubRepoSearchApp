import { useCallback, useEffect } from 'react';
import { View, Pressable } from 'react-native';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';

import AppBar from '@/components/common/AppBar';
import Text from '@/components/common/Text';
import SearchTextInput from '@/components/common/SearchTextInput';
import Spinner from '@/components/common/Spinner';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

import { RootStackParamList } from '@/navigation/RootNavigation';

import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { getRepositories } from '@/store/reducers/repositorySlice';

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.background};
`;

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

export type MovieScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

const Home = ({ navigation }: MovieScreenProps) => {
  const { top: paddingTop, bottom: paddingBottom } = useSafeAreaInsets();
  const { data, loading, error } = useAppSelector((state: RootState) => state.repositories);
  const dispatch = useAppDispatch();

  const handlePressSearch = () => {
    navigation.navigate('Search');
  };

  const renderRepositories = useCallback(({}) => {}, []);

  useEffect(() => {
    dispatch(getRepositories());
  }, []);

  return (
    <Container style={{ paddingTop }}>
      <AppBar />
      <ContentScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom }}>
        <TitleSection>
          <PageTitle typography="title">Home</PageTitle>
          <Pressable onPress={handlePressSearch}>
            <View pointerEvents="none">
              <SearchTextInput placeholder="깃헙 레포지토리 검색" />
            </View>
          </Pressable>
        </TitleSection>
        <Subtitle typography="subtitle1">저장된 레포지토리</Subtitle>
        <View>
          {loading ? (
            <StyledSpinner />
          ) : !!data.length ? (
            data.map(renderRepositories)
          ) : (
            <EmptyMessageContainer>
              <Text typography="body1">저장된 레포지토리가 없어요</Text>
              <EmptyMessageButton priority="secondary" label="레포지토리 검색하기" onPress={handlePressSearch} />
            </EmptyMessageContainer>
          )}
        </View>
      </ContentScrollView>
    </Container>
  );
};

export default Home;
