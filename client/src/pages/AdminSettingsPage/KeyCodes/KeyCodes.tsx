import React, { useState } from 'react';
import { useApolloClient, useQuery, useMutation } from '@apollo/client';
import { Typography, Grid, makeStyles, Theme, createStyles } from '@material-ui/core';
import XLSX from 'xlsx';
import { useTranslation } from 'react-i18next';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

import { KEYCODES, KeyCodeResponse, KeyCodeSeriesResponse, KEYCODE_SERIES, CREATE_KEYCODES } from '../../../graphql/keyCodesRepository';
import { getKeyCodesWorkbook } from './getKeyCodesWorkbook';
import { ButtonSecondary } from '../../../components/Button/ButtonSecondary';
import { RoleToggleButton } from './RoleToggleButton';
import { ActiveKeysList } from './ActiveKeysList';
import { KeyCodesToGenerateTextfield } from './KeyCodesToGenerateTextfield';
import { ButtonDefault } from '../../../components/Button';
import { openSnackbar } from '../../../components/Snackbar/openSnackbar';

export function KeyCodes() {
    const client = useApolloClient();  
    const {t} = useTranslation()
    const classes = useStyles();
    const { data} = useQuery<KeyCodeSeriesResponse>(KEYCODE_SERIES)
    const [ createKeyCodes, {data: createKeyCodesResponse} ] = useMutation(CREATE_KEYCODES)
    const [keyCodesToGenerate, setKeyCodesToGenerate] = useState(1);
    const [target, setTarget] = useState('parent')


    function generateExcel(series: string) {
        client
            .query<KeyCodeResponse>({
                query: KEYCODES,
                variables: {
                        series
                }
            })
            .then(response => {
                const keyCodes = response.data?.keyCodes;

                if (keyCodes) {
                    const filename = `mw-keycodes-${series}.xlsx`
                    const workbook = getKeyCodesWorkbook(keyCodes)

                    XLSX.writeFile(workbook, filename);

                    openSnackbar({text: t('admin-setting-page.keycode-generation.download-alert', { filename })})
                }
            });
    }

    if (!data) return null;

    return (
        <div>
            <Typography variant="body2">{t('admin-setting-page.keycode-generation.description')}</Typography>
            <Grid container direction="column" spacing={4} classes={{ root: classes.container}}>
                <Grid item>
                    <RoleToggleButton value={target} onChange={setTarget} />
                </Grid>
                <Grid item>
                    <KeyCodesToGenerateTextfield value={keyCodesToGenerate} onChange={(amount) => setKeyCodesToGenerate(amount)} />
                </Grid>
                <Grid item>
                    <ButtonSecondary disabled={keyCodesToGenerate === 0 || keyCodesToGenerate > 1000} onClick={() => {
                        createKeyCodes({
                            variables: {
                                target, 
                                amount: keyCodesToGenerate
                            }
                        })
                    }}
                    variant="contained"
                    >
                        {t('admin-setting-page.keycode-generation.generate')}
                    </ButtonSecondary>
                </Grid>
                <Grid item>{createKeyCodesResponse && <ButtonDefault
                                                        icon={<SaveAltIcon className={classes.downloadIcon} />}
                                                        onClick={() => generateExcel(createKeyCodesResponse.createKeyCodeBulk[0].series)}
                                                    >
                                                       {t('admin-setting-page.keycode-generation.download-as')}
                                                    </ButtonDefault>}</Grid>
            </Grid>
            <Grid container>
                <ActiveKeysList keyCodeSeries={data.keyCodeSeries} onKeyCodeClick={(series) => generateExcel(series)} />
            </Grid>
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        container: {
            padding: theme.spacing(2)
        },
        keyCodeTextfield: {
            width: 200
        },
        downloadIcon: {
            color: theme.palette.success.main,
        },
    }),
);
