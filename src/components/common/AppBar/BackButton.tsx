import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const BackButton = ({ style }: Pick<PressableProps, 'style'>) => {
  const navigation = useNavigation();

  const handlePressBack = () => {
    navigation.goBack();
  };

  return (
    <Pressable onPress={handlePressBack} style={style}>
      <Icon name="chevron-back" size={24} />
    </Pressable>
  );
};

export default BackButton;
