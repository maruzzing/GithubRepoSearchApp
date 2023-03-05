import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable } from 'react-native';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Text from '@/components/common/Text';

import { RootState, useAppSelector, useAppDispatch } from '@/store';
import { setValue } from '@/store/reducers/bannerSlice';

const Container = styled(Animated.View)`
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: ${props => props.theme.color.mono1};
  padding-horizontal: ${props => props.theme.space.layout}px;
  padding-vertical: ${props => props.theme.space.scale(2)}px;
  border-radius: ${props => props.theme.space.scale(1)}px;
  margin-horizontal: ${props => props.theme.space.layout}px;
  align-items: center;
`;

const Snackbar = () => {
  const { bottom } = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const { snackbarMessage } = useAppSelector((state: RootState) => state.banner);

  const positionY = useRef(new Animated.Value(200));
  const opacity = useRef(new Animated.Value(0));

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (snackbarMessage) setVisible(true);
  }, [snackbarMessage]);

  useEffect(() => {
    const fadeIn = Animated.sequence([
      Animated.timing(opacity.current, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.timing(positionY.current, {
        toValue: -(bottom + 28),
        duration: 300,
        useNativeDriver: true,
      }),
    ]);
    const fadeOut = Animated.sequence([
      Animated.timing(opacity.current, { toValue: 0, duration: 200, useNativeDriver: true, delay: 2000 }),
      Animated.timing(positionY.current, {
        toValue: 200,
        duration: 200,
        useNativeDriver: true,
      }),
    ]);

    if (visible) {
      fadeOut.stop();
      fadeIn.start(() => setVisible(false));
    } else {
      fadeOut.start(() => dispatch(setValue({ snackbarMessage: '' })));
    }
  }, [visible]);

  if (!snackbarMessage) return null;
  return (
    <Container style={{ opacity: opacity.current, transform: [{ translateY: positionY.current }] }}>
      <Pressable>
        <Text typography="subtitle2" color="white">
          {snackbarMessage}
        </Text>
      </Pressable>
    </Container>
  );
};

export default Snackbar;
