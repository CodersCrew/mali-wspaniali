import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { SearchInput } from './SearchInput';
import { ButtonSecondary } from '../../components/Button/ButtonSecondary';

interface Props {
    onAddKindergartenClick: () => void;
    onChangeLogClick: () => void;
}

export const ResultsActions = ({ onAddKindergartenClick, onChangeLogClick }: Props) => {
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
                onClick={onAddKindergartenClick}
            />
            <ButtonSecondary variant="outlined" innerText={t('test-results.change-log')} onClick={onChangeLogClick} />
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
