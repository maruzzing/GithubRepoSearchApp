import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import { useTheme } from 'styled-components/native';

const Spinner = ({ color, ...props }: ActivityIndicatorProps) => {
  const { color: themeColor } = useTheme();
  return <ActivityIndicator color={themeColor.primary} {...props} />;
};

export default Spinner;
