import XLSX from 'xlsx';
import dayjs from 'dayjs';

import { KeyCode } from '@app/graphql/types';

const WORKSHEET_NAME = 'KeyCodes';

export function getKeyCodesWorkbook(keyCodes: KeyCode[]) {
    const workbook = getWorkbookWithWorkSheet();

    const columnLabels = ['Utworzony:', 'Ważny do:', 'Kod aktywacyjny:'];

    workbook.Sheets[WORKSHEET_NAME] = createWorkSheetWithKeyCodes(columnLabels, keyCodes);

    return workbook;
}

function getWorkbookWithWorkSheet() {
    const workbook = XLSX.utils.book_new();

    workbook.Props = {
        Title: 'MW - Keycodes',
        Subject: 'Keycods',
        Author: 'MW',
        CreatedDate: new Date(),
    };

    workbook.SheetNames.push(WORKSHEET_NAME);

    return workbook;
}

function createWorkSheetWithKeyCodes(columnLabels: string[], keyCodes: KeyCode[]) {
    const wsData = [columnLabels, ...keyCodes.map(mapKeyCodesToSpreadsheetRows)];

    const worksheet = XLSX.utils.aoa_to_sheet(wsData);

    worksheet['!cols'] = [
        {
            width: 30,
        },
        {
            width: 20,
        },
    ];

    return worksheet;
}

function mapKeyCodesToSpreadsheetRows(keyCode: KeyCode) {
    return [
        dayjs(keyCode.createdAt).format('DD.MM.YYYY HH:MM'),
        dayjs(keyCode.createdAt).add(14, 'days').format('DD.MM.YYYY HH:MM'),
        keyCode.keyCode,
    ];
}
