import { useTranslation } from 'react-i18next';
import { TextField, InputAdornment } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

export function SearchInput(props: { onChange: (value: string) => void }) {
    const { t } = useTranslation();

    return (
        <TextField
            variant="outlined"
            id="search"
            label={t('user-settings.input-label')}
            fullWidth
            onChange={({ target: { value } }) => props.onChange(value)}
            InputProps={
                <InputAdornment position="end">
                    <SearchIcon />
                </InputAdornment>
            }
        />
    );
}
