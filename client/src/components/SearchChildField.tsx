import React from 'react';
import { Box, Grid, IconButton, TextField, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Search as SearchIcon } from '@material-ui/icons';

interface SearchChildFieldProps {
    isCompact: boolean;
    isOpen: boolean;
    onClick: () => void;
    searchTerm: string;
    onChange: (value: string) => void;
}

export function SearchChildField({ isCompact, isOpen, onClick, searchTerm, onChange }: SearchChildFieldProps) {
    const { t } = useTranslation();

    if (isCompact && !isOpen) {
        return (
            <Grid container justify="space-between" alignItems="center">
                <Grid item>
                    <Typography>{t('add-results-page.child-list')}</Typography>
                </Grid>
                <Grid item>
                    <IconButton aria-label="notifications" onClick={() => onClick()}>
                        <SearchIcon />
                    </IconButton>
                </Grid>
            </Grid>
        );
    }

    if (!isCompact) {
        return (
            <TextField
                variant="outlined"
                label={t('add-results-page.search-by-child-firstname')}
                value={searchTerm}
                onChange={({ target: { value } }) => onChange(value)}
                fullWidth
            />
        );
    }

    return (
        <Grid container direction="column">
            <Grid item>
                <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                        <Typography>{t('add-results-page.child-list')}</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton aria-label="notifications" onClick={() => onClick()}>
                            <SearchIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Box mb={1}>
                    <TextField
                        variant="outlined"
                        label={t('add-results-page.search-by-child-firstname')}
                        value={searchTerm}
                        onChange={({ target: { value } }) => onChange(value)}
                        fullWidth
                    />
                </Box>
            </Grid>
        </Grid>
    );
}
