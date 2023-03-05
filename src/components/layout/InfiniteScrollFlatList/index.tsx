import { useCallback } from 'react';
import { FlatList, FlatListProps } from 'react-native';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Spinner from '@/components/common/Spinner';
import Text from '@/components/common/Text';
import Divider from '@/components/common/Divider';

const NextPageSpinner = styled(Spinner)`
  margin-vertical: ${props => props.theme.space.scale(2)}px;
`;

const StyledSpinner = styled(Spinner)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const EmptyContainer = styled.View`
  align-items: center;
  padding: ${props => props.theme.space.scale(4)}px;
`;

interface InfiniteScrollFlatListProps extends FlatListProps<any> {
  loading?: boolean;
  loadingNextPage?: boolean;
  emptyMessage?: string;
}

const InfiniteScrollFlatList = ({
  loading,
  loadingNextPage,
  emptyMessage,
  contentContainerStyle,
  ...props
}: InfiniteScrollFlatListProps) => {
  const { bottom: paddingBottom } = useSafeAreaInsets();

  const ListFooterComponent = useCallback(() => {
    if (loadingNextPage) return <NextPageSpinner />;
    return null;
  }, [loadingNextPage]);

  const ListEmptyComponent = useCallback(() => {
    if (loading) return null;
    return (
      <EmptyContainer>
        <Text typography="subtitle2">{emptyMessage}</Text>
      </EmptyContainer>
    );
  }, [loading]);

  return (
    <>
      <FlatList
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[{ flexGrow: 1, paddingBottom }, contentContainerStyle]}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={emptyMessage ? ListEmptyComponent : undefined}
        ItemSeparatorComponent={Divider}
        bounces={false}
        {...props}
      />
      {loading && <StyledSpinner />}
    </>
  );
};

export default InfiniteScrollFlatList;
