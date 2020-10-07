import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { SearchInput } from './SearchInput';
import { AddOrEditKindergartenModal } from './KindergartenModals/AddOrEditKindergartenModal';
import { AddExcelModal } from './KindergartenModals/AddExcelModal';
import { ChangesHistoryModal } from './KindergartenModals/ChangesHistoryModal';
import { KindergartenFormValue } from './types';

interface Props {
    handleAddKindergarten: (values: KindergartenFormValue) => void;
}

export const ResultsActions = ({ handleAddKindergarten }: Props) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.input}>
                <SearchInput />
            </div>
            <AddOrEditKindergartenModal onSubmit={handleAddKindergarten} />
            <AddExcelModal />
            <ChangesHistoryModal />
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            alignItems: 'center',
            gap: `${theme.spacing(3)}px`, // for some reason it doesn't work without 'px'
            flexWrap: 'wrap',
        },
        input: {
            width: 330,
        },
    }),
);
