import { Box, Theme, makeStyles, createStyles } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { useTranslation } from 'react-i18next';
import Tooltip from '@material-ui/core/Tooltip';

export type MeasurementType = 'first' | 'last';

export const assessmentParts: AssessmentPart[] = [
    {
        type: 'first',
        assessmentName: 'add-results-page.first-assessment',
        assessmentShortName: 'test-results.first-measurement',
    },
    {
        type: 'last',
        assessmentName: 'add-results-page.last-assessment',
        assessmentShortName: 'test-results.last-measurement',
    },
];

export type AssessmentPart = {
    type: MeasurementType;
    assessmentName: string;
    assessmentShortName: string;
};

interface Props {
    value: AssessmentPart;
    onChange: (value: AssessmentPart) => void;
    disabled?: boolean;
}

export function TestToggleButton({ value, onChange, disabled }: Props) {
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
                    if (toggleValue) onChange(toggleValue);
                }}
            >
                {assessmentParts.map((assessmentPart) => (
                    <ToggleButton
                        disabled={disabled}
                        key={assessmentPart.type}
                        className={classes.ToggleButtonStyle}
                        value={assessmentPart}
                        aria-label="left aligned"
                    >
                        <Tooltip title={t(assessmentPart.assessmentName).toString()}>
                            <div className={classes.ToggleButtonContentStyle}>
                                {t(assessmentPart.assessmentShortName)}
                            </div>
                        </Tooltip>
                    </ToggleButton>
                ))}
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
