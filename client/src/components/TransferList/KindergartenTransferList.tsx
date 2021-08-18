import * as React from 'react';
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
    Box,
    ListItemText,
    makeStyles,
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

import { TransferListItem } from './TransferListItem';
import { ButtonBase } from '../Button/ButtonBase';
import { addOrDeleteFromArray } from '../../utils/addOrDeleteFromArray';
import { Kindergarten } from '../../graphql/types';

export interface SelectableKindergarten {
    kindergarten: Kindergarten;
    selected: boolean;
    disabled: boolean;
}

interface KindergartenTransferListProps {
    defaultKindergartens: SelectableKindergarten[];
    labels: {
        leftLabel: string;
        leftInputLabel: string;
        rightLabel: string;
        rightInputLabel: string;
    };
    onSelect: (id: SelectableKindergarten[]) => void;
}

export function KindergartenTransferList({ defaultKindergartens, onSelect, labels }: KindergartenTransferListProps) {
    const [selectableKindergartens, setSelectableKindergartens] = React.useState(defaultKindergartens);
    const [pickedItems, setPickedItems] = React.useState<string[]>([]);

    React.useEffect(() => {
        onSelect(selectableKindergartens);
    }, [selectableKindergartens]);

    return (
        <>
            <Grid container spacing={2} direction="row" alignItems="center">
                <Grid item xs={5}>
                    <KindergartenPicker
                        selectableKindergartens={selectableKindergartens.filter((k) => !k.selected)}
                        selected={pickedItems}
                        label={labels.leftLabel}
                        inputLabel={labels.leftInputLabel}
                        onChangeItem={(value) => setPickedItems((prev) => addOrDeleteFromArray(prev, value))}
                        onChangeAllItems={setPickedItems}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Box display="flex" alignItems="center" flexDirection="column">
                        <LabeledButton label="&gt;" onClick={() => onMove('left')} />
                        <LabeledButton label="&lt;" onClick={() => onMove('right')} />
                    </Box>
                </Grid>
                <Grid item xs={5}>
                    <KindergartenPicker
                        selectableKindergartens={selectableKindergartens.filter((k) => !!k.selected)}
                        selected={pickedItems}
                        label={labels.rightLabel}
                        inputLabel={labels.rightInputLabel}
                        onChangeItem={(value) => setPickedItems((prev) => addOrDeleteFromArray(prev, value))}
                        onChangeAllItems={setPickedItems}
                    />
                </Grid>
            </Grid>
        </>
    );

    function onMove(direction: string) {
        if (direction === 'left') {
            setSelectableKindergartens((prev) => {
                return prev.map((selectable) => {
                    if (pickedItems.includes(selectable.kindergarten._id)) {
                        return { ...selectable, selected: true };
                    }

                    return selectable;
                });
            });

            return;
        }

        setSelectableKindergartens((prev) => {
            return prev.map((selectable) => {
                if (pickedItems.includes(selectable.kindergarten._id)) {
                    return { ...selectable, selected: false };
                }

                return selectable;
            });
        });
    }
}

function KindergartenPicker(props: {
    selectableKindergartens: SelectableKindergarten[];
    selected: string[];
    label: string;
    inputLabel: string;
    onChangeItem: (value: string) => void;
    onChangeAllItems: (values: string[]) => void;
}) {
    const classes = useStyles();
    const { t } = useTranslation();
    const [searchKindergarten, setSearchKindergarten] = React.useState('');

    const searchableItems = props.selectableKindergartens.filter(({ kindergarten }) => {
        if (searchKindergarten.length === 0) return true;

        return kindergarten.name.toLowerCase().includes(searchKindergarten);
    });

    const isDisabled = !getMaxCount();

    return (
        <Paper className={classes.paper}>
            <ListItem dense classes={{ root: classes.input }} onClick={onAllItemsClick}>
                <Checkbox color="default" disabled={isDisabled} checked={isChecked()} />
                <ListItemText
                    primary={props.label}
                    secondary={t('general.selected-count', { count: getCount(), maxCount: getMaxCount() })}
                />
            </ListItem>
            <div className={classes.inputContainer}>
                <TextField
                    margin="dense"
                    id="search"
                    label={props.inputLabel}
                    variant="outlined"
                    autoComplete="off"
                    value={searchKindergarten}
                    fullWidth
                    classes={{ root: classes.input }}
                    onChange={({ target: { value } }) => setSearchKindergarten(value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon color="disabled" />
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <List dense component="div" role="list">
                            {searchableItems.map((selectableKindergarten) => {
                                const label = `${selectableKindergarten.kindergarten.number}/${selectableKindergarten.kindergarten.name}`;

                                return (
                                    <TransferListItem
                                        key={selectableKindergarten.kindergarten.number}
                                        checked={props.selected.includes(selectableKindergarten.kindergarten._id)}
                                        disabled={selectableKindergarten.disabled}
                                        label={
                                            <div>
                                                <div>{label}</div>
                                                <div className={classes.helperLabel}>
                                                    {selectableKindergarten.kindergarten.address}
                                                </div>
                                            </div>
                                        }
                                        onChange={() => props.onChangeItem(selectableKindergarten.kindergarten._id)}
                                    />
                                );
                            })}

                            <ListItem />
                        </List>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );

    function getCount() {
        return props.selectableKindergartens.filter((k) => props.selected.includes(k.kindergarten._id)).length;
    }

    function getMaxCount() {
        return props.selectableKindergartens.filter((k) => !k.disabled).length;
    }

    function isChecked() {
        return getMaxCount() > 0 && getMaxCount() === getCount();
    }

    function onAllItemsClick() {
        if (!isDisabled) {
            if (getCount() === getMaxCount()) {
                props.onChangeAllItems([]);
            } else {
                props.onChangeAllItems(
                    props.selectableKindergartens.filter((k) => !k.disabled).map((k) => k.kindergarten._id),
                );
            }
        }
    }
}

function LabeledButton({ label, onClick }: { label: string; onClick: () => void }) {
    const classes = useStyles();

    return (
        <ButtonBase
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={onClick}
            aria-label="move selected right"
        >
            {label}
        </ButtonBase>
    );
}

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(0.5, 0),
    },
    searchFieldContainer: {
        margin: theme.spacing(3, 0, 2),
    },
    paper: {
        height: 430,
    },
    inputContainer: {
        paddingTop: 0,
        paddingBottom: 0,
        margin: theme.spacing(0, 2),
        marginBottom: 4,
    },
    input: {
        marginTop: 0,
        cursor: 'pointer',
    },
    helperLabel: {
        color: theme.palette.grey['400'],
        marginLeft: theme.spacing(1),
    },
}));
