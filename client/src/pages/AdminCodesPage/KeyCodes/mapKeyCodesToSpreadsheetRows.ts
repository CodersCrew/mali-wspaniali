import { KeyCode } from '@app/graphql/types';
import dayjs from 'dayjs';

export function mapKeyCodesToSpreadsheetRows(keyCode: KeyCode) {
    const validBy = dayjs(keyCode.createdAt).add(14, 'days');

    return [
        'Kod do utworzenia konta w serwisie app.mali-wspaniali.pl:',
        keyCode.keyCode,
        'Ważny do:',
        `${validBy.format('DD.MM.YYYY')}, godz. ${validBy.format('HH:MM')}`,
    ];
}
