import { KeyCode } from '@app/graphql/types';
import { createWorkSheetWithKeyCodes } from './createWorkSheetWithKeyCodes';
import { WORKSHEET_NAME } from './constants';
import { getWorkbookWithWorkSheet } from './getWorkbookWithWorkSheet';

export function getKeyCodesWorkbook(keyCodes: KeyCode[]) {
    const workbook = getWorkbookWithWorkSheet();

    const columnLabels: string[] = ['Wygenerowano', '', '', ''];

    workbook.Sheets[WORKSHEET_NAME] = createWorkSheetWithKeyCodes(columnLabels, keyCodes);

    return workbook;
}
