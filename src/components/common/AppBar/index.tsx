import { Pressable } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import Text from '@/components/common/Text';
import React from 'react';

interface AppBarProps {
  title?: string;
  hasHistory?: boolean;
  RightComponent?: React.ReactElement;
}

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: ${props => props.theme.space.layout}px;
  padding-vertical: ${props => props.theme.space.scale(2)}px;
`;

const Left = styled.View`
  justify-content: center;
  align-items: flex-start;
  flex-grow: 1;
  flex-basis: 0;
  height: 24px;
`;

const Right = styled.View`
  justify-content: center;
  align-items: flex-end;
  flex-grow: 1;
  flex-basis: 0;
  height: 24px;
`;

const TextContainer = styled.View`
  flex-grow: 2;
  flex-basis: 0;
  justify-content: center;
  align-items: center;
`;

const Title = styled(Text)``;

const AppBar = ({ title, hasHistory = false, RightComponent }: AppBarProps) => {
  const navigation = useNavigation();

  const handlePressBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <Left>
        {hasHistory && (
          <Pressable onPress={handlePressBack}>
            <Icon name="chevron-back" size={24} />
          </Pressable>
        )}
      </Left>
      <TextContainer>
        <Title allowFontScaling={false} typography="subtitle2" numberOfLines={1}>
          {title}
        </Title>
      </TextContainer>
      <Right>{RightComponent}</Right>
    </Container>
  );
};

export default AppBar;
