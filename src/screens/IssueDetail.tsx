import { useCallback, useContext, useState } from 'react';
import { useTheme } from 'styled-components';
import { WebView } from 'react-native-webview';
import { StackScreenProps } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { Alert, Linking, Pressable } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

import { RootStackParamList } from '@/navigation/RootNavigation';

import PageTemplate from '@/components/layout/PageTemplate';
import Spinner from '@/components/common/Spinner';
import Icon from '@/components/common/Icon';

export type IssueDetailProps = StackScreenProps<RootStackParamList, 'IssueDetail'>;

const StyledSpinner = styled(Spinner)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

const RepoIconButton = styled.Pressable`
  margin-right: ${props => props.theme.space.scale(1.5)}px;
`;

const RepoIcon = styled(Octicons)`
  color: ${props => props.theme.color.mono1};
`;

const IssueDetail = ({ route, navigation }: IssueDetailProps) => {
  const {
    params: { htmlUrl, repositoryUrl },
  } = route;
  const { space } = useTheme();

  const [loading, setLoading] = useState(true);

  const AppBarRight = useCallback(() => {
    const handlePressOpenBrowser = () => {
      Linking.openURL(htmlUrl);
    };

    const handlePressRepo = () => {
      const [owner, repo] = repositoryUrl.split('repos/')[1].split('/');
      navigation.push('RepoDetail', { item: { name: repo, owner: { login: owner } } });
    };
    return (
      <Row>
        <RepoIconButton onPress={handlePressRepo} hitSlop={8}>
          <RepoIcon name="repo" size={22} />
        </RepoIconButton>
        <Pressable onPress={handlePressOpenBrowser} hitSlop={8}>
          <Icon name="open-outline" size={24} />
        </Pressable>
      </Row>
    );
  }, [htmlUrl, repositoryUrl]);

  return (
    <PageTemplate hasAppBar hasHistory RightComponent={<AppBarRight />}>
      <WebView
        source={{ uri: htmlUrl }}
        style={{ flex: 1, paddingHorizontal: space.layout }}
        onLoadEnd={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          Alert.alert('????????? ???????????????', '?????? ??? ?????? ????????? ?????????.', [{ text: '??????' }]);
        }}
        onHttpError={syntheticEvent => {
          const { nativeEvent } = syntheticEvent;
          if (nativeEvent.statusCode === 404) {
            Alert.alert('???????????? ???????????? ?????????', '', [{ text: '??????' }]);
          } else {
            Alert.alert('????????? ???????????????', '?????? ??? ?????? ????????? ?????????.', [{ text: '??????' }]);
          }
        }}
      />
      {loading && <StyledSpinner />}
    </PageTemplate>
  );
};

export default IssueDetail;
