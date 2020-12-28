import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, MenuItem, TextField } from '@material-ui/core';
import { Assessment } from '../../graphql/types';

interface Props {
    assessments: Assessment[];
    selectedAssessment: string;
    selectedKindergarten: string;
    searchTerm: string;
    onChange: (changed: { type: string; value: string }) => void;
}

export function ChildListHeader({
    assessments,
    selectedAssessment,
    selectedKindergarten,
    searchTerm,
    onChange,
}: Props) {
    const { t } = useTranslation();
    const kindergartens = assessments.find((a) => a._id === selectedAssessment)?.kindergartens || [];

    return (
        <div>
            <Grid container direction="row" spacing={3}>
                <Grid item xs={4}>
                    <TextField
                        select
                        label={t('add-results-page.test-name')}
                        onChange={({ target: { value } }) => onChange({ type: 'assessment', value: value as string })}
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
                <Grid item xs={4}>
                    <TextField
                        select
                        label={t('add-results-page.kindergarten-name')}
                        onChange={({ target: { value } }) => onChange({ type: 'kindergarten', value: value as string })}
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
                <Grid item xs={4}>
                    <TextField
                        variant="outlined"
                        label={t('add-results-page.search-by-child-firstname')}
                        value={searchTerm}
                        onChange={({ target: { value } }) => onChange({ type: 'searchTerm', value })}
                        fullWidth
                    />
                </Grid>
            </Grid>
        </div>
    );
}
