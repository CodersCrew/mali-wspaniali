import dayjs from 'dayjs';
import i18next from 'i18next';
import 'dayjs/locale/pl';
import relativeTime from 'dayjs/plugin/relativeTime';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(relativeTime);
dayjs.extend(LocalizedFormat);

dayjs.locale(i18next.language);

export default dayjs;
