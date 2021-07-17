import { makeStyles, Grid } from '@material-ui/core';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { Input } from '../ChildForm/Input';
import { useBreakpoints } from '../../queries/useBreakpoints';
import { AddInstructorNameResult } from '../../graphql/types';

export type AddInstructorNameFormProps = {
    formik: FormikProps<AddInstructorNameResult>;
};

export const AddInstructorNameForm = ({ formik }: AddInstructorNameFormProps) => {
    const classes = useStyles();
    const device = useBreakpoints();
    const { t } = useTranslation();

    return (
        <Grid container spacing={2} className={classes.container}>
            <Grid item xs={12}>
                <Grid container spacing={2} direction={device !== 'DESKTOP' ? 'column' : 'row'}>
                    <Grid item classes={{ root: classes.item }}>
                        <Input
                            value={formik.values.firstname}
                            name="firstname"
                            label={t('add-instructor-name-modal.inputs.firstname')}
                            error={formik.errors.firstname}
                            touched={formik.touched.firstname}
                            onChange={(name: string, value: string) => formik.setFieldValue(name, value)}
                        />
                    </Grid>
                    <Grid item classes={{ root: classes.item }}>
                        <Input
                            value={formik.values.lastname}
                            name="lastname"
                            label={t('add-instructor-name-modal.inputs.lastname')}
                            error={formik.errors.lastname}
                            touched={formik.touched.lastname}
                            onChange={(name: string, value: string) => {
                                formik.setFieldValue(name, value);
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export const useStyles = makeStyles(() => ({
    container: {
        maxWidth: 640,
    },
    item: {
        flex: 1,
    },
}));
