import { forwardRef, useState, useRef, useImperativeHandle } from 'react';
import { Pressable, NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from 'styled-components';

import Icon from '@/components/common/Icon';

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
  color: ${props => props.theme.color.mono1};
  padding: 0px;
  line-height: 19px;
`;

const SearchIconContainer = styled.Pressable`
  margin-left: ${props => props.theme.space.scale(1)}px;
`;

const Rect = styled.View`
  width: ${CLEAR_ICON_SIZE}px;
  height: ${CLEAR_ICON_SIZE}px;
`;

const ClearButtonContainer = styled.View`
  margin-left: ${props => props.theme.space.scale(1)}px;
`;

export type SearchTextInputRef = { setValue: (q: string) => void };

const SearchTextInput = forwardRef<SearchTextInputRef, TextInputProps>(
  ({ value: initialValue = '', onSubmit, onChangeText, ...props }, ref) => {
    const [value, setValue] = useState(initialValue);
    const inputRef = useRef<RNTextInput>(null);
    const { color } = useTheme();

    useImperativeHandle(ref, () => ({
      setValue,
    }));

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
          ref={inputRef}
          placeholderTextColor={color.mono3}
          textAlignVertical="center"
          cursorColor={color.primary}
          {...props}
        />
        <ClearButtonContainer>
          {!!value ? (
            <Pressable onPress={() => inputRef.current?.clear()} hitSlop={8}>
              <Icon name="close-circle" size={CLEAR_ICON_SIZE} color="mono4" />
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
          <Icon name="search" size={20} color="mono2" />
        </SearchIconContainer>
      </Container>
    );
  },
);

export default SearchTextInput;
