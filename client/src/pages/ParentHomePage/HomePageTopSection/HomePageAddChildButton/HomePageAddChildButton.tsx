import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useTranslation } from 'react-i18next';
import { HomePageAddChildCard } from './HomePageAddChildCard';

type Props = {
    onClick: () => void;
};

export const HomePageAddChildButton = ({ onClick }: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <HomePageAddChildCard
            key="key-add-child"
            id="id-add-key"
            firstName={t('parent-children.add-child')}
            PictureComponent={<AddCircleIcon className={classes.icon} />}
            onClick={onClick}
        />
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            color: theme.palette.text.secondary,
            width: '75px',
            height: '126px',
            objectFit: 'contain',
            borderRadius: '4px 4px 0px 0px',

            [theme.breakpoints.down('sm')]: {
                // maxWidth: '90px',
                width: '75px',
                maxHeight: '90px',
                height: '90px',
            },
        },
    }),
);
