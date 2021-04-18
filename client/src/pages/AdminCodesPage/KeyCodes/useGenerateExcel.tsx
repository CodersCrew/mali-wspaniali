import { writeFile } from 'xlsx';

import { getKeyCodesWorkbook } from './getKeyCodesWorkbook';
import { useKeyCodes } from '../../../operations/queries/KeyCodes/getKeyCodes';

export function useGenerateExcel(onCreate: (filename: string) => void) {
    const { getKeyCodes, keyCodes } = useKeyCodes();

    return {
        generateExcel(series: string) {
            getKeyCodes(series);

            // TODO: remove
            console.log('series:', series);
            console.log('keyCodes:', keyCodes);
            // console.log(
            //     'keyCodes:',
            //     keyCodes.map((code) => {
            //         return { ...code, keyCode: `${target === 'parent' ? 'P' : 'I'}.${code.keyCode}` };
            //     }),
            // );

            if (keyCodes.length > 0) {
                const filename = `mw-keycodes-${series}.xlsx`;
                // const workbook = getKeyCodesWorkbook(keyCodes);
                const workbook = getKeyCodesWorkbook(
                    keyCodes.map((code) => {
                        return { ...code, keyCode: `${code.target === 'parent' ? 'P' : 'I'}.${code.keyCode}` };
                    }),
                );

                writeFile(workbook, filename);

                onCreate(filename);
            }
        },
    };
}
