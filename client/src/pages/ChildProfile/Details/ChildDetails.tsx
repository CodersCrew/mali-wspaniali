import { createStyles, makeStyles, Paper, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { EditChildPanel } from './EditChildPanel';
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
        <Paper classes={{ root: classes.container }}>
            <Typography variant="h4">{t('child-profile.child-details.form')} </Typography>
            <EditChildPanel
                child={child}
                handleSubmit={(updatedChild) => {
                    editChild({
                        childId: child._id,
                        firstname: updatedChild.firstname,
                        lastname: updatedChild.lastname,
                        birthYear: parseInt(updatedChild['birth-date'], 10),
                        birthQuarter: parseInt(updatedChild['birth-quarter'], 10),
                        sex: updatedChild.sex,
                        kindergartenId: updatedChild.kindergarten,
                    });
                }}
                kindergartens={kindergartenList}
            />
        </Paper>
    );
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: theme.spacing(2),
        },
    }),
);
