import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, InputAdornment, TextField } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

import { KindergartenColumn } from './KindergartenColumn';
import { Kindergarten } from '../../../graphql/types';

interface Props {
    defaultKindergartens: Array<{ kindergarten: Kindergarten; selected: boolean; disabled: boolean }>;
    selected: string[];
    onSelect: (id: string[]) => void;
}

export function KindergartenTransferList({ defaultKindergartens, selected, onSelect }: Props) {
    const [checked, setChecked] = useState<Kindergarten[]>([]);
    const [left, setLeft] = useState(defaultKindergartens.filter((k) => !k.selected).map((k) => k.kindergarten));
    const [right, setRight] = useState(defaultKindergartens.filter((k) => !!k.selected).map((k) => k.kindergarten));
    const [searchPhrase, setSearchPhrase] = useState('');

    const { t } = useTranslation();
    const classes = useStyles();

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
        console.log(leftChecked);

        onSelect(selected.concat(leftChecked.map((k) => k._id)));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));

        rightChecked.forEach((kindergarten) => {
            selected.splice(selected.indexOf(kindergarten._id), 1);
        });
    };

    return (
        <>
            <Grid container spacing={2} direction="row" className={classes.root}>
                <Grid item>
                    <TextField
                        margin="dense"
                        id="search"
                        label={t('add-test-view.basic-information-form.search')}
                        variant="outlined"
                        autoComplete="off"
                        value={searchPhrase}
                        onChange={({ target: { value } }) => setSearchPhrase(value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon color="disabled" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    {KindergartenColumn(left)}
                </Grid>
                <Grid item>
                    <Grid container direction="column" alignItems="center">
                        <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            onClick={handleCheckedRight}
                            disabled={leftChecked.length === 0}
                            aria-label="move selected right"
                        >
                            &gt;
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            onClick={handleCheckedLeft}
                            disabled={rightChecked.length === 0}
                            aria-label="move selected left"
                        >
                            &lt;
                        </Button>
                    </Grid>
                </Grid>
                <Grid item>
                    <TextField
                        margin="dense"
                        id="search"
                        label={t('add-test-view.basic-information-form.search')}
                        variant="outlined"
                        autoComplete="off"
                        value={searchPhrase}
                        onChange={({ target: { value } }) => setSearchPhrase(value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon color="disabled" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    {KindergartenColumn(right)}
                </Grid>
            </Grid>
        </>
    );
}

function not(a: Kindergarten[], b: Kindergarten[]) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: Kindergarten[], b: Kindergarten[]) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        flexWrap: 'nowrap',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
}));
