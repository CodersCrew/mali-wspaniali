import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { SearchInput } from './SearchInput';
import { ButtonSecondary } from '../../components/Button/ButtonSecondary';

interface Props {
    setKindergartenModalOpen: (value: boolean) => void;
    setExcelModalOpen: (value: boolean) => void;
    setChangesHistoryModalOpen: (value: boolean) => void;
}

export const ResultsActions = ({ setKindergartenModalOpen, setExcelModalOpen, setChangesHistoryModalOpen }: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <div className={classes.container}>
            <div className={classes.input}>
                <SearchInput />
            </div>
            <ButtonSecondary
                variant="contained"
                innerText={t('test-results.add-kindergarten')}
                onClick={() => setKindergartenModalOpen(true)}
            />
            <ButtonSecondary
                variant="contained"
                innerText={t('test-results.add-excel')}
                onClick={() => setExcelModalOpen(true)}
            />
            <ButtonSecondary
                variant="outlined"
                innerText={t('test-results.changes-history')}
                onClick={() => setChangesHistoryModalOpen(true)}
            />
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
