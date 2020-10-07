import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

export const SearchInput = () => {
    return (
        <TextField
            variant="outlined"
            id="search"
            label="Szukaj"
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
