import { Box, Grid, IconButton, Typography } from '@material-ui/core';
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
    const [isSearchFieldOpen, setIsSearchFieldOpen] = React.useState(false);

    if (props.isCompact && !isSearchFieldOpen) {
        return <SearchFieldLabel onClick={() => setIsSearchFieldOpen((prev) => !prev)} />;
    }

    if (!props.isCompact) {
        const placeholder = t('add-results-page.search-by-child-full-name');

        return (
            <OutlinedTextField
                label={placeholder}
                value={props.searchTerm}
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
        <Box mb={1} mt={1}>
            <Grid container justify="space-between" alignItems="center">
                <Grid item>
                    <Typography component={'span'}>
                        <Box fontWeight={500}>{label}</Box>
                    </Typography>
                </Grid>
                <Grid item>
                    <IconButton size="small" aria-label="notifications" onClick={props.onClick}>
                        <SearchIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    );
}

interface ExtendedSearchFieldProps {
    searchTerm: string;
    onClick: () => void;
    onChange: (value: string) => void;
}

function ExtendedSearchField(props: ExtendedSearchFieldProps) {
    const { t } = useTranslation();
    const placeholder = t('add-results-page.search-by-child-full-name');

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
            <Grid item>
                <Box mb={2} mt={1}>
                    <OutlinedTextField
                        label={placeholder}
                        value={props.searchTerm}
                        options={{ autoFocus: true }}
                        onChange={props.onChange}
                    />
                </Box>
            </Grid>
        </Grid>
    );
}
