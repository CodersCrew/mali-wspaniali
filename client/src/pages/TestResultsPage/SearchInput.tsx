import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, InputAdornment } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

export const SearchInput = () => {
    const { t } = useTranslation();

    return (
        <TextField
            variant="outlined"
            id="search"
            label={t('test-results.search')}
            fullWidth
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />
    );
};
