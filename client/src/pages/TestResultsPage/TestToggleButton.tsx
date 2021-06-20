import { Box } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { useTranslation } from 'react-i18next';

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export function TestToggleButton({ value, onChange }: Props) {
    const { t } = useTranslation();
    const ToggleButtonStyle = {
        paddingLeft: '16px',
        paddingRight: '16px',
    };

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
                    style={ToggleButtonStyle}
                    value={'add-results-page.first-assessment'}
                    aria-label="left aligned"
                >
                    {t('test-results.initial-measurement')}
                </ToggleButton>
                <ToggleButton
                    style={ToggleButtonStyle}
                    value={'add-results-page.last-assessment'}
                    aria-label="right aligned"
                >
                    {t('test-results.final-measurement')}
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
}
