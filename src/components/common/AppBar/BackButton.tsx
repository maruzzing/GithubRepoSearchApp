import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

const BackIcon = styled(Icon)`
  color: ${props => props.theme.color.mono1};
`;

const BackButton = ({ style }: Pick<PressableProps, 'style'>) => {
  const navigation = useNavigation();

  const handlePressBack = () => {
    navigation.goBack();
  };

  return (
    <Pressable onPress={handlePressBack} style={style}>
      <BackIcon name="chevron-back" size={24} />
    </Pressable>
  );
};

export default BackButton;
