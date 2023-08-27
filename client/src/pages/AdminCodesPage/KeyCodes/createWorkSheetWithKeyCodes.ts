import { KeyCode } from '@app/graphql/types';
import XLSX from 'xlsx';
import dayjs from 'dayjs';
import { mapKeyCodesToSpreadsheetRows } from './mapKeyCodesToSpreadsheetRows';

export function createWorkSheetWithKeyCodes(columnLabels: string[], keyCodes: KeyCode[]) {
    const { createdAt } = keyCodes[0];
    const [column, ...rest] = columnLabels;
    const columns = [`${column}: ${dayjs(createdAt).format('DD.MM.YYYY, HH:MM')}`, ...rest];

    const wsData = [columns, ...keyCodes.map(mapKeyCodesToSpreadsheetRows)];

    const worksheet = XLSX.utils.aoa_to_sheet(wsData);

    worksheet['!cols'] = [
        {
            width: 50,
        },
        {
            width: 15,
        },
        {
            width: 10,
        },
        {
            width: 25,
        },
    ];

    return worksheet;
}
