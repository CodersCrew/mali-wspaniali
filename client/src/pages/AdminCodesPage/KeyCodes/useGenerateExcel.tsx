import { writeFile } from 'xlsx';

import { useKeyCodes } from '../../../operations/queries/KeyCodes/getKeyCodes';

import { getKeyCodesWorkbook } from './getKeyCodesWorkbook';

export function useGenerateExcel(onCreate: (filename: string) => void) {
    const { getKeyCodes, keyCodes } = useKeyCodes();

    return {
        generateExcel(series: string) {
            getKeyCodes(series);

            if (keyCodes.length > 0) {
                const filename = `mw-keycodes-${series}.xlsx`;
                const workbook = getKeyCodesWorkbook(keyCodes);

                writeFile(workbook, filename);

                onCreate(filename);
            }
        },
    };
}
