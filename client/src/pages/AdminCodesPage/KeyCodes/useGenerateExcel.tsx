import { writeFile } from 'xlsx';

import { useKeyCodes } from '@app/operations/queries/KeyCodes/useKeyCodes';
import isEmpty from 'lodash/isEmpty';
import { useEffect, useState } from 'react';
import { getKeyCodesWorkbook } from './getKeyCodesWorkbook';

export function useGenerateExcel(onCreate: (filename: string) => void) {
    const { keyCodes, getKeyCodes } = useKeyCodes();

    const [bulk, setBulk] = useState('');

    const generateExcel = (series: string) => {
        setBulk(() => series);
        getKeyCodes(series);
    };

    useEffect(() => {
        if (!isEmpty(bulk) && !isEmpty(keyCodes)) {
            const { target } = keyCodes[0];

            const filename = `mw-keycodes-${target}-${keyCodes.length}-${bulk}.xlsx`;

            const workbook = getKeyCodesWorkbook(
                keyCodes.map((code) => ({
                    ...code,
                    keyCode: `${code.target === 'parent' ? 'P' : 'I'}.${code.keyCode}`,
                })),
            );

            setBulk(() => '');

            writeFile(workbook, filename);

            onCreate(filename);
        }
    }, [keyCodes, bulk]);

    return { generateExcel };
}
