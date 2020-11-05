import React from 'react';
import { createStyles, makeStyles, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { EditChildModal } from './EditChildModal';
import { Theme } from '../../../theme';
import { useKindergartens } from '../../../operations/queries/Kindergartens/getKindergartens';
import { Loader } from '../../../components/Loader';
import { Child } from '../../../graphql/types';
import { useEditChild } from '../../../operations/mutations/User/editChild';

interface Props {
    child: Child;
}

export function ChildDetails({ child }: Props) {
    const { kindergartenList, isKindergartenListLoading } = useKindergartens();
    const { editChild } = useEditChild();
    const classes = useStyles();
    const { t } = useTranslation();

    if (!kindergartenList) return null;

    if (isKindergartenListLoading) return <Loader />;

    return (
        <div className={classes.mainContainer}>
            <Typography variant="h4">{t('child-profile.child-details.form')} </Typography>
            <EditChildModal
                child={child}
                handleSubmit={_child => {
                    editChild({
                        childId: child._id,
                        firstname: _child.firstname,
                        lastname: _child.lastname,
                        birthYear: parseInt(_child['birth-date'], 10),
                        sex: _child.sex,
                        kindergartenId: _child.kindergarten,
                    });
                }}
                kindergartens={kindergartenList}
            />
        </div>
    );
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mainContainer: {
            background: theme.palette.background.paper,
            margin: theme.spacing(3),
            padding: theme.spacing(2),
        },
    }),
);
