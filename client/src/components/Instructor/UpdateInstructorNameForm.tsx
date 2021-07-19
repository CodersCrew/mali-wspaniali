import { makeStyles, Grid, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { Input } from '../ChildForm/Input';
import { useBreakpoints } from '../../queries/useBreakpoints';
import { useTheme } from '../../theme';

import { UpdateInstructorNameFormProps } from './UpdateInstructorName.types';

export const UpdateInstructorNameForm = ({ formik }: UpdateInstructorNameFormProps) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const device = useBreakpoints();
    const { t } = useTranslation();

    return (
        <Grid container-fluid spacing={2}>
            <Grid item xs={12}>
                <Grid
                    container
                    spacing={2}
                    direction={device !== 'DESKTOP' ? 'column' : 'row'}
                    className={classes.container}
                >
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
                <Grid container-fluid className={classes.container}>
                    <Grid item>
                        <Input
                            disabled
                            label={t('add-instructor-name-modal.inputs.email')}
                            value={formik.values.mail}
                            name="mail"
                        />
                    </Grid>
                </Grid>
                <Box mb={4} />
            </Grid>
        </Grid>
    );
};

export const useStyles = makeStyles((theme) => ({
    container: {
        marginBottom: theme.spacing(1),
    },
    item: {
        flex: 1,
    },
}));
