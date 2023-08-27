import XLSX from 'xlsx';
import { WORKSHEET_NAME } from '@app/pages/AdminCodesPage/KeyCodes/constants';

export function getWorkbookWithWorkSheet() {
    const workbook = XLSX.utils.book_new();

    workbook.Props = {
        Title: 'MW - Keycodes',
        Subject: 'Keycodes',
        Author: 'MW',
        CreatedDate: new Date(),
    };

    workbook.SheetNames.push(WORKSHEET_NAME);

    return workbook;
}
