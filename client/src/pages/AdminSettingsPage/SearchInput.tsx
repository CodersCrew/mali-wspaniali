import { useTranslation } from 'react-i18next';
import { TextField, InputAdornment } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

export const SearchInput = () => {
    const { t } = useTranslation();

    return (
        <TextField
            variant="outlined"
            id="search"
            label={t('user-settings.input-label')}
            fullWidth
            InputProps={
                <InputAdornment position="end">
                    <SearchIcon />
                </InputAdornment>
            }
        />
    );
};
