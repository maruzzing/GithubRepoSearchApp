import { PropsWithChildren } from 'react';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppBar, { AppBarProps } from '@/components/common/AppBar';

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.background};
`;

interface PageTemplateProps extends AppBarProps {
  hasAppBar?: boolean;
}

const PageTemplate = ({ children, hasAppBar = false, ...props }: PropsWithChildren<PageTemplateProps>) => {
  const { top: paddingTop } = useSafeAreaInsets();

  return (
    <Container style={{ paddingTop }}>
      {hasAppBar && <AppBar {...props} />}
      {children}
    </Container>
  );
};

export default PageTemplate;
