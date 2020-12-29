import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, IconButton, MenuItem, TextField, Typography } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { Assessment } from '../../graphql/types';

interface Props {
    assessments: Assessment[];
    selectedAssessment: string;
    selectedKindergarten: string;
    searchTerm: string;
    compact?: boolean;
    onChange: (type: string, value: string) => void;
}

export function ChildListHeader({
    assessments,
    selectedAssessment,
    selectedKindergarten,
    searchTerm,
    compact,
    onChange,
}: Props) {
    const { t } = useTranslation();
    const kindergartens = assessments.find((a) => a._id === selectedAssessment)?.kindergartens || [];
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <div>
            <Grid container direction={compact ? 'column' : 'row'} spacing={3}>
                <Grid item xs={compact ? 12 : 4}>
                    <TextField
                        select
                        label={t('add-results-page.test-name')}
                        onChange={({ target: { value } }) => onChange('assessment', value as string)}
                        variant="outlined"
                        value={selectedAssessment}
                        fullWidth
                        SelectProps={{
                            MenuProps: {
                                getContentAnchorEl: null,
                                anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                            },
                        }}
                    >
                        {assessments.map((a) => (
                            <MenuItem value={a._id} key={a.title}>
                                {a.title}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={compact ? 12 : 4}>
                    <TextField
                        select
                        label={t('add-results-page.kindergarten-name')}
                        onChange={({ target: { value } }) => onChange('kindergarten', value as string)}
                        variant="outlined"
                        value={selectedKindergarten}
                        fullWidth
                        SelectProps={{
                            MenuProps: {
                                getContentAnchorEl: null,
                                anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                            },
                        }}
                    >
                        {kindergartens.map((k) => (
                            <MenuItem value={k.kindergarten._id} key={k.kindergarten._id}>
                                {k.kindergarten.number}/{k.kindergarten.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={compact ? 12 : 4}>
                    <SearchField
                        isCompact={!!compact}
                        isOpen={isSearchOpen}
                        onClick={() => setIsSearchOpen((prev) => !prev)}
                        searchTerm={searchTerm}
                        onChange={(value) => onChange('searchTerm', value)}
                    />
                </Grid>
            </Grid>
        </div>
    );
}

interface SearchFieldProps {
    isCompact: boolean;
    isOpen: boolean;
    onClick: () => void;
    searchTerm: string;
    onChange: (value: string) => void;
}

function SearchField({ isCompact, isOpen, onClick, searchTerm, onChange }: SearchFieldProps) {
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
                <TextField
                    variant="outlined"
                    label={t('add-results-page.search-by-child-firstname')}
                    value={searchTerm}
                    onChange={({ target: { value } }) => onChange(value)}
                    fullWidth
                />
            </Grid>
        </Grid>
    );
}
