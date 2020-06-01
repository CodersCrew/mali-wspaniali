import moment from 'moment';
import i18next from 'i18next';
import 'moment/locale/pl';

moment.defineLocale(i18next.language, {});

export default moment;