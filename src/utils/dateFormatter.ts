import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export const getDateDiffFromNow = (date: Date) => {
  const now = dayjs();
  const then = dayjs(date);

  return (
    now.diff(then, 'year') + 'y' ||
    now.diff(then, 'month') + 'm' ||
    now.diff(then, 'week') + 'w' ||
    now.diff(then, 'day') + 'd' ||
    now.diff(then, 'hour') + 'h' ||
    now.diff(then, 'minute') + 'm' ||
    now.diff(then, 'second') + 's'
  );
};
