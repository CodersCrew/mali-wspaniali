import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    ListItem,
    Checkbox,
    List,
    Paper,
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

import { KindergartenListItem } from './KindergartenListItem';
import { Kindergarten } from '../../../graphql/types';
import { ButtonBase } from '../../../components/Button/ButtonBase';

interface Props {
    defaultKindergartens: Array<{ kindergarten: Kindergarten; selected: boolean; disabled: boolean }>;
    selected: string[];
    onSelect: (id: string[]) => void;
}

export function KindergartenTransferList({ defaultKindergartens, selected, onSelect }: Props) {
    const [checked, setChecked] = useState<Kindergarten[]>([]);
    const [left, setLeft] = useState(defaultKindergartens.filter((k) => !k.selected).map((k) => k.kindergarten));
    const [right, setRight] = useState(defaultKindergartens.filter((k) => !!k.selected).map((k) => k.kindergarten));
    const [searchKindergarten, setSearchKindergarten] = useState('');
    const [searchInstructor, setSearchInstructor] = useState('');

    const { t } = useTranslation();
    const classes = useStyles();

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));

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

    // const handleToggle = (kindergarten: Kindergarten) => () => {
    //     const currentIndex = checked.indexOf(kindergarten);
    //     const newChecked = [...checked];

    //     if (currentIndex === -1) {
    //         newChecked.push(kindergarten);
    //     } else {
    //         newChecked.splice(currentIndex, 1);
    //     }

    //     setChecked(newChecked);
    // };

    return (
        <>
            <Grid container spacing={2} direction="row" className={classes.root} alignItems="center">
                <Grid container>
                    <TableRow hover role="row">
                        <TableCell padding="checkbox">
                            <Checkbox color="default" />
                        </TableCell>
                        <TableCell title={'already used'}></TableCell>
                    </TableRow>
                    <Grid item>
                        <TextField
                            margin="dense"
                            id="search"
                            label={t('add-test-view.basic-information-form.search')}
                            variant="outlined"
                            autoComplete="off"
                            value={searchKindergarten}
                            onChange={({ target: { value } }) => setSearchKindergarten(value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon color="disabled" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TableContainer classes={{ root: classes.table }}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell padding="checkbox"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <Paper className={classes.paper}>
                                        <List dense component="div" role="list">
                                            {defaultKindergartens
                                                .filter((k) => !k.selected)
                                                .filter(({ kindergarten }) => {
                                                    if (searchKindergarten.length === 0) return true;

                                                    return kindergarten.name.toLowerCase().includes(searchKindergarten);
                                                })
                                                .map(({ kindergarten }) => {
                                                    const labelId = `transfer-list-item-${kindergarten._id}-label`;

                                                    return (
                                                        <KindergartenListItem
                                                            key={kindergarten.number}
                                                            checked={checked}
                                                            kindergartenItem={kindergarten}
                                                            labelId={labelId}
                                                            setChecked={setChecked}
                                                        />
                                                    );
                                                })}

                                            <ListItem />
                                        </List>
                                    </Paper>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>

                <Grid container direction="column" alignItems="center">
                    <ButtonBase
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </ButtonBase>
                    <ButtonBase
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </ButtonBase>
                </Grid>
                <Grid item>
                    <Grid container>
                        <TableRow hover role="row">
                            <TableCell padding="checkbox">
                                <Checkbox color="default" />
                            </TableCell>
                            <TableCell title={'already used'}></TableCell>
                        </TableRow>

                        <TextField
                            margin="dense"
                            id="search"
                            label={t('add-test-view.basic-information-form.search')}
                            variant="outlined"
                            autoComplete="off"
                            value={searchInstructor}
                            onChange={({ target: { value } }) => setSearchInstructor(value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon color="disabled" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TableContainer classes={{ root: classes.table }}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell padding="checkbox"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <Paper className={classes.paper}>
                                        <List dense component="div" role="list">
                                            {defaultKindergartens
                                                .filter((k) => !!k.selected)
                                                .filter(({ kindergarten }) => {
                                                    if (searchKindergarten.length === 0) return true;

                                                    return kindergarten.name.toLowerCase().includes(searchInstructor);
                                                })
                                                .map(({ kindergarten }) => {
                                                    const labelId = `transfer-list-item-${kindergarten._id}-label`;

                                                    return (
                                                        <KindergartenListItem
                                                            key={kindergarten.number}
                                                            checked={checked}
                                                            kindergartenItem={kindergarten}
                                                            labelId={labelId}
                                                            setChecked={setChecked}
                                                        />
                                                    );
                                                })}

                                            <ListItem />
                                        </List>
                                    </Paper>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
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
    table: {
        height: 295,
    },
    searchFieldContainer: {
        margin: theme.spacing(3, 0, 2),
    },
    paper: {
        width: 200,
        height: 230,
        overflow: 'auto',
    },
}));
