import { dateFnsLocalizer } from 'react-big-calendar';
import enUs from 'date-fns/locale/en-US';
import { format, parse, startOfWeek, getDay } from 'date-fns';


const locales = {
    'en-US': enUs
}

export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});