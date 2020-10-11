import { useLazyQuery } from '@apollo/client';
import { writeFile } from 'xlsx';

import { KEYCODES } from '../../../graphql/keyCodesRepository';
import { getKeyCodesWorkbook } from './getKeyCodesWorkbook';

export function useGenerateExcel(onCreate: (filename: string) => void) {
    const [getKeyCodeSeries, {data}] = useLazyQuery(KEYCODES);

    return {
        generateExcel(series: string) {
            getKeyCodeSeries({
                variables: {
                    series,
                },
            });

            const keyCodes = data?.keyCodes;

            if (keyCodes) {
                
                const filename = `mw-keycodes-${series}.xlsx`
                const workbook = getKeyCodesWorkbook(keyCodes)

                writeFile(workbook, filename);

                onCreate(filename)
            }
        },
    };
}
