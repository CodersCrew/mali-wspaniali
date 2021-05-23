import { useState } from 'react';
import { Box, Grid, IconButton, Typography, Theme, makeStyles, createStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Search as SearchIcon } from '@material-ui/icons';
import { OutlinedTextField } from './OutlinedTextField';

interface SearchChildFieldProps {
    searchTerm: string;
    isCompact?: boolean;
    onChange: (value: string) => void;
}

export function SearchChildField(props: SearchChildFieldProps) {
    const { t } = useTranslation();
    const [isSearchFieldOpen, setIsSearchFieldOpen] = useState(false);

    if (props.isCompact && !isSearchFieldOpen) {
        return <SearchFieldLabel onClick={() => setIsSearchFieldOpen((prev) => !prev)} />;
    }

    if (!props.isCompact) {
        const placeholder = t('add-results-page.search-by-child-firstname');

        return (
            <OutlinedTextField
                label={placeholder}
                input={props.searchTerm}
                options={{ autoFocus: true }}
                onChange={props.onChange}
            />
        );
    }

    return (
        <ExtendedSearchField
            searchTerm={props.searchTerm}
            onClick={() => setIsSearchFieldOpen((prev) => !prev)}
            onChange={props.onChange}
        />
    );
}

interface SearchFieldLabelProps {
    onClick: () => void;
}

function SearchFieldLabel(props: SearchFieldLabelProps) {
    const { t } = useTranslation();
    const label = t('add-results-page.child-list');

    return (
        <Grid container justify="space-between" alignItems="center">
            <Grid item>
                <Typography>{label}</Typography>
            </Grid>
            <Grid item>
                <IconButton size="small" aria-label="notifications" onClick={props.onClick}>
                    <SearchIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
}

interface ExtendedSearchFieldProps {
    searchTerm: string;
    onClick: () => void;
    onChange: (value: string) => void;
}

function ExtendedSearchField(props: ExtendedSearchFieldProps) {
    const { t } = useTranslation();
    const placeholder = t('add-results-page.search-by-child-firstname');
    const classes = useStyles();

    return (
        <Grid container direction="column">
            <Grid item>
                <SearchFieldLabel
                    onClick={() => {
                        props.onChange('');
                        props.onClick();
                    }}
                />
            </Grid>
            <Grid item className={classes.searchField}>
                <Box mb={1}>
                    <OutlinedTextField
                        label={placeholder}
                        input={props.searchTerm}
                        options={{ autoFocus: true }}
                        onChange={props.onChange}
                    />
                </Box>
            </Grid>
        </Grid>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        searchField: {
            marginTop: theme.spacing(2),
        },
    }),
);
