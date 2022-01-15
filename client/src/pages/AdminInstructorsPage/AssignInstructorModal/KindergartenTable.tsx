import React from 'react';
import {
    TextField,
    InputAdornment,
    Checkbox,
    createStyles,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Theme,
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { Kindergarten } from '../../../graphql/types';

interface Props {
    defaultKindergartens: Array<{ kindergarten: Kindergarten; selected: boolean; disabled: boolean }>;
    selected: string[];
    onSelect: (id: string[]) => void;
}

export const KindergartenTable = ({ defaultKindergartens, selected, onSelect }: Props) => {
    const { t } = useTranslation();
    const [searchPhrase, setSearchPhrase] = React.useState('');
    const classes = useStyles();

    return (
        <>
            <TextField
                id="search"
                label={t('add-test-view.basic-information-form.search')}
                variant="outlined"
                fullWidth
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
            <TableContainer classes={{ root: classes.table }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox"></TableCell>
                            <TableCell>{t('add-test-view.kindergartens.kindergarten-name')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {defaultKindergartens
                            .filter(({ kindergarten }) => {
                                if (searchPhrase.length === 0) return true;

                                return kindergarten.name.toLowerCase().includes(searchPhrase);
                            })
                            .map((kindergartenItem) => {
                                const isSelected = selected.includes(kindergartenItem.kindergarten._id);

                                return (
                                    <KindergartenItem
                                        key={kindergartenItem.kindergarten._id}
                                        disabled={kindergartenItem.disabled}
                                        selected={isSelected}
                                        kindergarten={kindergartenItem.kindergarten}
                                        onClick={onItemSelect}
                                    />
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );

    function onItemSelect(id: string) {
        const calculatedSelection = selected.includes(id)
            ? selected.filter((kindergartenId) => kindergartenId !== id)
            : [...selected, id];

        onSelect(calculatedSelection);
    }
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
            height: 295,
        },
        searchFieldContainer: {
            margin: theme.spacing(3, 0, 2),
        },
    }),
);

interface KindergartenItemProps {
    disabled: boolean;
    selected: boolean;
    kindergarten: Kindergarten;
    onClick: (id: string) => void;
}

function KindergartenItem(props: KindergartenItemProps) {
    const classes = useItemStyles();

    const kindergartenNameclasses: { root?: string } = {};

    if (!props.disabled) {
        kindergartenNameclasses.root = classes.kindergartenItem;
    }

    return (
        <TableRow
            key={props.kindergarten._id}
            hover
            role="row"
            onClick={() => {
                if (props.disabled) return;

                props.onClick(props.kindergarten._id);
            }}
        >
            <TableCell padding="checkbox">
                <Checkbox checked={props.selected} disabled={props.disabled} color="default" />
            </TableCell>
            <TableCell classes={kindergartenNameclasses} title={'already used'}>
                <div>
                    {props.kindergarten.number}/{props.kindergarten.name}
                </div>
                <div>
                    {props.kindergarten.address}&nbsp;{props.kindergarten.city}
                </div>
            </TableCell>
        </TableRow>
    );
}

const useItemStyles = makeStyles((theme: Theme) =>
    createStyles({
        kindergartenItem: {
            cursor: 'pointer',
        },
    }),
);
