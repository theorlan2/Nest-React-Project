import dayjs from "dayjs";
import isYesterday from 'dayjs/plugin/isYesterday';


export function formatDateIsYesterday(time: string): string {
    let result = '';
    dayjs.extend(isYesterday);
    const isAfterToday = dayjs().isAfter(time, 'day');
    const _isYesterday = dayjs(time).isYesterday();

    if (_isYesterday) {
        result = 'Yesterday';
    } else {
        result = dayjs(time).format(isAfterToday ? 'DD MMMM' : 'hh:mm a')
    }
    return result;
}