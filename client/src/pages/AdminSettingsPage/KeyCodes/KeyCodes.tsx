import React, { useState } from 'react';
import { useApolloClient, useQuery, useMutation } from '@apollo/client';
import { Typography, Grid, makeStyles, Theme, createStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import {
    KEYCODES,
    KeyCodeResponse,
    KeyCodeSeriesResponse,
    KEYCODE_SERIES,
    CREATE_KEYCODES,
    CreateKeyCodeSeriesResponse,
} from '../../../graphql/keyCodesRepository';
import { getKeyCodesWorkbook } from './getKeyCodesWorkbook';
import { RoleToggleButton } from './RoleToggleButton';
import { ActiveKeysList } from './ActiveKeysList';
import { KeyCodesToGenerateTextfield } from './KeyCodesToGenerateTextfield';
import { openSnackbar } from '../../../components/Snackbar/openSnackbar';
import { FilenameButton } from './FilenameButton';
import { LoadingButton } from './LoadingButton';
import { useGenerateExcel } from './useGenerateExcel';

export function KeyCodes() {
    const { t } = useTranslation();
    const classes = useStyles();
    const { data } = useQuery<KeyCodeSeriesResponse>(KEYCODE_SERIES);
    const [createKeyCodes, { data: createKeyCodesResponse }] = useMutation<CreateKeyCodeSeriesResponse>(CREATE_KEYCODES, {
        update(cache, {data: newKeyCodeResponse}) {
            if (newKeyCodeResponse) {
                const newKeyCode = newKeyCodeResponse.createKeyCodeBulk[0];

                cache.modify({
                    fields: {
                        keyCodeSeries(keycodes = []) {

                            return [...keycodes, {...newKeyCode, __typename: 'KeyCodeSeriesDTO'}]
                        }
                    }
                })
            }
        }
    });
    const [keyCodesToGenerate, setKeyCodesToGenerate] = useState(1);
    const [target, setTarget] = useState('parent');
    const [isLoading, setIsLoading] = useState(false);
    const { generateExcel } = useGenerateExcel(filename => {
        openSnackbar({ text: t('admin-setting-page.keycode-generation.download-alert', { filename }) });
    });

    if (!data) return null;

    return (
        <div>
            <Typography variant="body2">{t('admin-setting-page.keycode-generation.description')}</Typography>
            <Grid container direction="column" spacing={4} classes={{ root: classes.container }}>
                <div className={classes.toggleContainer}>
                    <RoleToggleButton value={target} onChange={setTarget} />
                </div>
                <div className={classes.amountContainer}>
                    <KeyCodesToGenerateTextfield
                        value={keyCodesToGenerate}
                        onChange={amount => setKeyCodesToGenerate(amount)}
                    />
                </div>
                <div className={classes.generateButtonContainer}>
                    <LoadingButton
                        isLoading={isLoading}
                        isDisabled={isLoading || keyCodesToGenerate === 0 || keyCodesToGenerate > 1000}
                        text={t('admin-setting-page.keycode-generation.generate')}
                        onClick={() => {
                            setIsLoading(true);
                            createKeyCodes({
                                variables: {
                                    target,
                                    amount: keyCodesToGenerate,
                                },
                            }).then(() => setIsLoading(false));
                        }}
                    />
                </div>
                <div className={classes.generatedFileContainer}>
                    {createKeyCodesResponse && (
                        <FilenameButton
                            primary
                            tooltip={t('admin-setting-page.keycode-generation.download')}
                            text={t('admin-setting-page.keycode-generation.download-as')}
                            onClick={() => generateExcel(createKeyCodesResponse.createKeyCodeBulk[0].series)}
                        />
                    )}
                </div>
            </Grid>
            <div className={classes.fileListContainer}>
                <ActiveKeysList keyCodeSeries={data.keyCodeSeries} onKeyCodeClick={series => generateExcel(series)} />
            </div>
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toggleContainer: {
            marginTop: theme.spacing(4),
        },
        amountContainer: {
            marginTop: 40,
        },
        generateButtonContainer: {
            marginTop: theme.spacing(3),
        },
        generatedFileContainer: {
            marginTop: 12,
        },
        container: {
            padding: theme.spacing(2),
        },
        fileListContainer: {
            marginTop: 40,
        },
    }),
);
