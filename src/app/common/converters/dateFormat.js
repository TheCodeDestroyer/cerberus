import moment from 'moment';

export class DateFormatValueConverter {
    toView(value, format) {
        if (!format) {
            format = 'D/M/YYYY HH:mm:ss';
        }
        return moment(value).format(format);
    }
}
