import { useState } from 'react';
import { Pressable, NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { TextInput as RNTextInput, TextInputProps as RNTextInputProps } from 'react-native';

interface TextInputProps extends RNTextInputProps {
  onSubmit?: (value: string) => void;
}

const CLEAR_ICON_SIZE = 20;

const Container = styled.View`
  width: 100%;
  padding-horizontal: ${props => props.theme.space.scale(2)}px;
  padding-vertical: ${props => props.theme.space.scale(1.5)}px;
  border-radius: ${props => props.theme.space.scale(1)}px;
  background-color: ${props => props.theme.color.cardBackground};
  flex-direction: row;
  align-items: center;
`;

const StyledTextInput = styled(RNTextInput)`
  ${props => props.theme.typography.body1};
  include-font-padding: false;
  width: 100%;
  flex-shrink: 1;
`;

const SearchIconContainer = styled.Pressable`
  margin-left: ${props => props.theme.space.scale(1)}px;
`;

const SearchIcon = styled(Icon)`
  color: ${props => props.theme.color.mono2};
`;

const ClearIcon = styled(Icon)`
  color: ${props => props.theme.color.mono3};
`;

const Rect = styled.View`
  width: ${CLEAR_ICON_SIZE}px;
  height: ${CLEAR_ICON_SIZE}px;
`;

const ClearButtonContainer = styled.View`
  margin-left: ${props => props.theme.space.scale(1)}px;
`;

const SearchTextInput = ({ value: initialValue = '', onSubmit, onChangeText, ...props }: TextInputProps) => {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = ({ nativeEvent: { text } }: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    onSubmit?.(text);
  };

  const handleChangeText = (text: string) => {
    setValue(text);
    onChangeText?.(text);
  };

  return (
    <Container>
      <StyledTextInput
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyLabel="검색"
        returnKeyType="search"
        multiline={false}
        onSubmitEditing={handleSubmit}
        onChangeText={handleChangeText}
        value={value}
        {...props}
      />
      <ClearButtonContainer>
        {!!value ? (
          <Pressable onPress={() => setValue('')} hitSlop={8}>
            <ClearIcon name="close-circle" size={CLEAR_ICON_SIZE} />
          </Pressable>
        ) : (
          <Rect />
        )}
      </ClearButtonContainer>
      <SearchIconContainer
        onPress={() => {
          onSubmit?.(value);
        }}
        hitSlop={8}>
        <SearchIcon name="search" size={20} />
      </SearchIconContainer>
    </Container>
  );
};

export default SearchTextInput;
