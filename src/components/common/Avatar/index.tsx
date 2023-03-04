import styled from 'styled-components/native';
import FastImage, { FastImageProps } from 'react-native-fast-image';

export interface AvatarProps extends FastImageProps {
  size?: 20 | 24;
}

const StyledAvatar = styled(FastImage)<{ size: Exclude<AvatarProps['size'], undefined> }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: ${props => props.size / 2}px;
  background-color: ${props => props.theme.color.background}px;
`;

const Avatar = ({ size = 20, ...props }: AvatarProps) => {
  return <StyledAvatar size={size} {...props} />;
};

export default Avatar;
