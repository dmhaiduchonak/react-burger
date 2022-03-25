import React from 'react';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import timezone from 'dayjs/plugin/timezone';

import 'dayjs/locale/ru';

const  thresholds = [
    { l: 'd', r: 1 },
    { l: 'dd', r: 29, d: 'day' },
    { l: 'M', r: 1 },
    { l: 'MM', r: 11, d: 'month' },
    { l: 'y' },
    { l: 'yy', d: 'year' }
];

dayjs.locale('ru');
dayjs.extend(timezone);
dayjs.extend(advancedFormat)
dayjs.extend(relativeTime, {thresholds});

interface Props {
    datetime: string;
}

export const Datetime = ({datetime}: Props) => {
    const prettyDate = React.useMemo(() => {
        return `${dayjs(datetime).fromNow()} ${dayjs(datetime).format('HH:mm [i-]z')}`
    }, [datetime]);
    return (<>{prettyDate}</>);
}

export default Datetime;
