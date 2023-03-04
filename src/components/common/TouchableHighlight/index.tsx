import {
  TouchableHighlight as RNTouchableHighlight,
  TouchableHighlightProps as RNTouchableHighlightProps,
} from 'react-native';

export interface TouchableHighlightProps extends RNTouchableHighlightProps {}

const TouchableHighlight = ({ children, ...props }: TouchableHighlightProps) => {
  return (
    <RNTouchableHighlight activeOpacity={0.97} underlayColor="rgba(0, 0, 0, 0.03)" {...props}>
      {children}
    </RNTouchableHighlight>
  );
};

export default TouchableHighlight;
