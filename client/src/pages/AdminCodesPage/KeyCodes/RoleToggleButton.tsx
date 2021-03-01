import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { useTranslation } from 'react-i18next';

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export function RoleToggleButton({ value, onChange }: Props) {
    const { t } = useTranslation();

    return (
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
            <ToggleButton value="parent" aria-label="left aligned">
                {t('admin-setting-page.keycode-generation.role-parent')}
            </ToggleButton>
            <ToggleButton value="instructor" aria-label="right aligned">
                {t('admin-setting-page.keycode-generation.role-instructor')}
            </ToggleButton>
        </ToggleButtonGroup>
    );
}
