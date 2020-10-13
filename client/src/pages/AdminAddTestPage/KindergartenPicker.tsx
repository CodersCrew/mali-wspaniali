import React from 'react';
import {
    Checkbox,
    createStyles,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { LabeledContainer } from '../../components/LabeledContainer';
import { Kindergarten } from '../../graphql/types';

interface Props {
    kindergartens: Kindergarten[];
}

export function KindergartenPicker({ kindergartens }: Props) {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <LabeledContainer title={t('add-test-view.kindergartens.title')}>
            <>
                <Typography variant="subtitle1">{t('add-test-view.kindergartens.description')}</Typography>
                <TextField id="outlined-search" label="Search field" type="search" variant="outlined" fullWidth />
                <TableContainer classes={{ root: classes.table }}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox checked={true} onChange={() => null} name="checkedB" color="default" />
                                </TableCell>
                                <TableCell>{t('add-test-view.kindergartens.kindergarten-name')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {kindergartens.map(kindergarten => (
                                <TableRow key={kindergarten.name} hover>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={true}
                                            onChange={() => null}
                                            name="checkedB"
                                            color="default"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {kindergarten.number}/{kindergarten.name}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        </LabeledContainer>
    );
}

const useStyles = makeStyles(() =>
    createStyles({
        table: {
            maxHeight: 350,
        },
    }),
);
