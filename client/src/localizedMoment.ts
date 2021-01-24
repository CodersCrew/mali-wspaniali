import dayjs from 'dayjs';
import i18next from 'i18next';
import 'dayjs/locale/pl';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

dayjs.locale(i18next.language);

export default dayjs;
