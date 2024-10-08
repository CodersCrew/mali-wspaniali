import { useState } from 'react';
import { Typography, Grid, makeStyles, Theme, createStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { openSnackbar } from '@app/components/Snackbar/openSnackbar';
import { useCreateKeyCodes } from '@app/operations/mutations/KeyCodes/createKeyCodes';
import { useKeyCodeSeries } from '@app/operations/queries/KeyCodes/getKeyCodesSeries';
import { RoleToggleButton } from './RoleToggleButton';
import { ActiveKeysList } from './ActiveKeysList';
import { KeyCodesToGenerateTextfield } from './KeyCodesToGenerateTextfield';
import { FilenameButton } from './FilenameButton';
import { LoadingButton } from './LoadingButton';
import { useGenerateExcel } from './useGenerateExcel';

const INITIAL_KEY_CODE_AMOUNT = 1;

export function KeyCodes() {
    const { t } = useTranslation();
    const classes = useStyles();
    const { keyCodeSeries } = useKeyCodeSeries();
    const { createKeyCodes, created, resetCreated } = useCreateKeyCodes();
    const [keyCodesToGenerate, setKeyCodesToGenerate] = useState(INITIAL_KEY_CODE_AMOUNT);
    const [target, setTarget] = useState('parent');
    const [isLoading, setIsLoading] = useState(false);
    const { generateExcel } = useGenerateExcel((filename) => {
        // eslint-disable-next-line no-void
        void openSnackbar({ text: t('admin-setting-page.keycode-generation.download-alert', { filename }) });
    });

    const handleClick = async () => {
        setIsLoading(true);

        await createKeyCodes({
            variables: {
                target,
                amount: keyCodesToGenerate,
            },
        });

        setIsLoading(false);
        setKeyCodesToGenerate(INITIAL_KEY_CODE_AMOUNT);
    };

    const handleKeyCodeClick = (series: string) => {
        generateExcel(series);
    };

    return (
        <div>
            <Typography variant="body2">{t('admin-setting-page.keycode-generation.description')}</Typography>

            <Grid container direction="column" spacing={4} classes={{ root: classes.container }}>
                <div className={classes.toggleContainer}>
                    <RoleToggleButton
                        value={target}
                        onChange={(role) => {
                            setTarget(role);
                            setKeyCodesToGenerate(INITIAL_KEY_CODE_AMOUNT);
                            resetCreated();
                        }}
                    />
                </div>

                <div className={classes.amountContainer}>
                    <KeyCodesToGenerateTextfield
                        value={keyCodesToGenerate}
                        onChange={(amount) => setKeyCodesToGenerate(parseInt(amount, 10))}
                    />
                </div>

                <div className={classes.generateButtonContainer}>
                    <LoadingButton
                        data-testid="generate-keycodes-series"
                        isLoading={isLoading}
                        isDisabled={
                            isLoading || !keyCodesToGenerate || keyCodesToGenerate > 1000 || keyCodesToGenerate < 1
                        }
                        text={t('admin-setting-page.keycode-generation.generate')}
                        onClick={handleClick}
                    />
                </div>

                <span className={classes.generatedFileContainer}>
                    {created && (
                        <FilenameButton
                            primary
                            tooltip={t('admin-setting-page.keycode-generation.download')}
                            text={t('admin-setting-page.keycode-generation.download-as')}
                            onClick={() => generateExcel(created.series)}
                        />
                    )}
                </span>
            </Grid>

            <div className={classes.fileListContainer}>
                <ActiveKeysList keyCodeSeries={keyCodeSeries} onKeyCodeClick={handleKeyCodeClick} />
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
            display: 'flex',
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
