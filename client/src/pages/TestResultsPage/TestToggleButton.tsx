import { Box, Theme, makeStyles, createStyles } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { useTranslation } from 'react-i18next';
import Tooltip from '@material-ui/core/Tooltip';

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export function TestToggleButton({ value, onChange }: Props) {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <Box alignItems={'center'} display="flex">
            <ToggleButtonGroup
                exclusive
                aria-label="text alignment"
                size="small"
                value={value}
                onChange={(e, toggleValue) => {
                    if (toggleValue) {
                        onChange(toggleValue);
                    }
                }}
            >
                <ToggleButton
                    className={classes.ToggleButtonStyle}
                    value={'add-results-page.first-assessment'}
                    aria-label="left aligned"
                >
                    <Tooltip title={t('add-results-page.first-assessment').toString()}>
                        <div className={classes.ToggleButtonContentStyle}>{t('test-results.first-measurement')}</div>
                    </Tooltip>
                </ToggleButton>
                <ToggleButton
                    className={classes.ToggleButtonStyle}
                    value={'add-results-page.last-assessment'}
                    aria-label="right aligned"
                >
                    <Tooltip title={t('add-results-page.last-assessment').toString()}>
                        <div className={classes.ToggleButtonContentStyle}>{t('test-results.last-measurement')}</div>
                    </Tooltip>
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        ToggleButtonStyle: {
            padding: '0px 0px',
        },
        ToggleButtonContentStyle: {
            padding: '6px 16px',
        },
    }),
);
