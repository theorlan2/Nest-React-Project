import dayjs from "dayjs";
import isYesterday from 'dayjs/plugin/isYesterday';


export function formatDateIsYesterday(time: string, specificDate?: string): string {
    let result = '';
    dayjs.extend(isYesterday);
    const newDate = dayjs(time);
    const newSpecificDate = dayjs(specificDate);
    const isAfterToday = newSpecificDate.isAfter(newDate, 'day');
    const _isYesterday = newDate.diff(specificDate, 'days') == 0 ? true : false;

    if (_isYesterday) {
        result = 'Yesterday';
    } else {
        result = dayjs(time).format(isAfterToday ? 'DD MMMM' : 'hh:mm a')
    }
    return result;
}