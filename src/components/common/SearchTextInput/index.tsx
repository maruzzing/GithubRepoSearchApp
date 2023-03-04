import { forwardRef, useRef } from 'react';
import { Pressable } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { TextInput as RNTextInput, TextInputProps as RNTextInputProps } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

interface TextInputProps extends RNTextInputProps {}

const CLEAR_ICON_SIZE = 20;

const Container = styled.View`
  align-self: stretch;
  padding-horizontal: ${props => props.theme.space.scale(1.5)}px;
  padding-vertical: ${props => props.theme.space.scale(1.5)}px;
  border-radius: ${props => props.theme.space.scale(1)}px;
  background-color: ${props => props.theme.color.cardBackground};
  flex-direction: row;
  align-items: center;
`;

const StyledTextInput = styled(RNTextInput)`
  ${props => props.theme.typography.body1};
  width: 100%;
  flex-shrink: 1;
  include-font-padding: false;
`;

const SearchIcon = styled(Icon)`
  color: ${props => props.theme.color.mono2};
  margin-right: ${props => props.theme.space.scale(1)}px;
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

const SearchTextInput = forwardRef<RNTextInput, TextInputProps>(({ value, ...props }: TextInputProps, ref) => {
  const inputRef = useRef<TextInput>(null);

  return (
    <Container>
      <SearchIcon name="search" size={20} />
      <StyledTextInput
        ref={inputRef}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyLabel="검색"
        returnKeyType="search"
        multiline={false}
        {...props}
      />
      <ClearButtonContainer>
        {!!value ? (
          <Pressable onPress={() => inputRef.current?.clear()} hitSlop={8}>
            <ClearIcon name="close-circle" size={CLEAR_ICON_SIZE} />
          </Pressable>
        ) : (
          <Rect />
        )}
      </ClearButtonContainer>
    </Container>
  );
});

export default SearchTextInput;
