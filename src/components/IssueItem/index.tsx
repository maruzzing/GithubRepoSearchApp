import styled from 'styled-components/native';

import TouchableHighlight, { TouchableHighlightProps } from '@/components/common/TouchableHighlight';
import Text from '@/components/common/Text';
import Icon from '@/components/common/Icon';

import type { Issue } from '@/types';
import { getDateDiffFromNow } from '@/utils/dateFormatter';

interface IssueItemProps extends TouchableHighlightProps {
  item: Issue;
}

const Container = styled(TouchableHighlight)`
  background-color: ${props => props.theme.color.cardBackground};
  padding: ${props => props.theme.space.scale(2)}px;
  flex-direction: row;
`;

const Title = styled(Text)``;

const StateIcon = styled(Icon)<Pick<Issue, 'state'>>`
  color: ${props => props.theme.color[props.state === 'closed' ? 'primary' : 'mono2']};
  margin-right: ${props => props.theme.space.scale(1)}px;
  align-self: center;
`;

const DetailContainer = styled.View`
  flex: 1;
  margin-right: ${props => props.theme.space.scale(1)}px;
`;

const NumberRow = styled.View`
  flex-direction: row;
  margin-top: ${props => props.theme.space.scale(0.5)}px;
  align-items: center;
`;

const CommentRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: ${props => props.theme.space.scale(1)}px;
`;

const CommentIcon = styled(Icon)`
  color: ${props => props.theme.color.mono2};
  margin-right: ${props => props.theme.space.scale(0.25)}px;
`;

const OpenedAt = styled(Text)`
  font-family: NotoSansKr-medium;
`;

const IssueItem = ({ item, ...props }: IssueItemProps) => {
  return (
    <Container {...props}>
      <>
        <StateIcon
          state={item.state}
          name={item.state === 'closed' ? 'checkmark-circle' : 'ellipsis-horizontal-circle'}
          size={24}
        />
        <DetailContainer>
          <Title typography="subtitle2" numberOfLines={3}>
            {item.title}
          </Title>
          <NumberRow>
            <Text typography="body2" color="mono2">
              #{item.number}
            </Text>
            {!!item.comments && (
              <CommentRow>
                <CommentIcon name="md-chatbubbles-outline" size={14} />
                <Text typography="body2" color="mono2">
                  {item.comments}
                </Text>
              </CommentRow>
            )}
          </NumberRow>
        </DetailContainer>
        <OpenedAt typography="subtitle2" color="mono3">
          {getDateDiffFromNow(item.created_at)}
        </OpenedAt>
      </>
    </Container>
  );
};

export default IssueItem;
