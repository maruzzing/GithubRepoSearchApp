import { useState } from 'react';
import { useTheme } from 'styled-components';
import { WebView } from 'react-native-webview';
import { StackScreenProps } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { Alert } from 'react-native';

import { RootStackParamList } from '@/navigation/RootNavigation';

import PageTemplate from '@/components/layout/PageTemplate';
import Spinner from '@/components/common/Spinner';

export type IssueDetailProps = StackScreenProps<RootStackParamList, 'IssueDetail'>;

const StyledSpinner = styled(Spinner)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const IssueDetail = ({ route }: IssueDetailProps) => {
  const {
    params: { url },
  } = route;
  const { space } = useTheme();

  const [loading, setLoading] = useState(true);

  return (
    <PageTemplate hasAppBar hasHistory>
      <WebView
        source={{ uri: url }}
        style={{ flex: 1, paddingHorizontal: space.layout }}
        onLoadEnd={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          Alert.alert('오류가 발생했어요', '잠시 후 다시 시도해 주세요.', [{ text: '확인' }]);
        }}
        onHttpError={syntheticEvent => {
          const { nativeEvent } = syntheticEvent;
          if (nativeEvent.statusCode === 404) {
            Alert.alert('페이지가 존재하지 않아요', '', [{ text: '확인' }]);
          } else {
            Alert.alert('오류가 발생했어요', '잠시 후 다시 시도해 주세요.', [{ text: '확인' }]);
          }
        }}
      />
      {loading && <StyledSpinner />}
    </PageTemplate>
  );
};

export default IssueDetail;
