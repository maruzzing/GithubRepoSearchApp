import { View, Pressable } from 'react-native';
import styled, { css } from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';

import AppBar from '@/components/common/AppBar';
import Text from '@/components/common/Text';
import SearchTextInput from '@/components/common/SearchTextInput';

import { RootStackParamList } from '@/navigation/RootNavigation';

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.background};
`;

const PageTitle = styled(Text)`
  margin-bottom: ${props => props.theme.space.scale(1)}px;
`;

const TitleSection = styled.View`
  margin-bottom: ${props => props.theme.space.scale(3)}px;
`;

const Content = styled.ScrollView``;

export type MovieScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

const Home = ({ navigation }: MovieScreenProps) => {
  const { top: paddingTop, bottom: paddingBottom } = useSafeAreaInsets();

  const handlePressSearch = () => {
    navigation.navigate('Search');
  };

  return (
    <Container style={{ paddingTop }}>
      <AppBar />
      <Content contentContainerStyle={{ paddingHorizontal: 20, paddingBottom }}>
        <TitleSection>
          <PageTitle variants="title">Home</PageTitle>
          <Pressable onPress={handlePressSearch}>
            <View pointerEvents="none">
              <SearchTextInput placeholder="깃헙 레포지토리 검색" />
            </View>
          </Pressable>
        </TitleSection>
        <Text variants="subtitle1">저장된 레포지토리</Text>
      </Content>
    </Container>
  );
};

export default Home;
