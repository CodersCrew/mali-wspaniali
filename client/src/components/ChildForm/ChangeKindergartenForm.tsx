import { Typography, makeStyles, Theme, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { FieldArray, FormikProps } from 'formik';
import { Kindergarten } from '../../graphql/types';

import { Select } from './Select';
import { mapKindergartenToOption } from './utils';

interface TinitialObjestType {
    firstname: string;
    lastname: string;
    id: string;
    kindergarden: string;
    kindergardenName: string;
    sex: string;
    birthYear: number;
    birthQuarter: number;
}

interface ChildData {
    childData: TinitialObjestType[];
}

interface ChangeKindergartenProps {
    kindergartens: Kindergarten[];
    formik: FormikProps<ChildData>;
}

export const ChangeKindergartenModal = ({ formik, kindergartens }: ChangeKindergartenProps) => {
    const { t } = useTranslation();
    const kindergartenOptions = kindergartens.map(mapKindergartenToOption);

    const classes = useStyles();

    return (
        <FieldArray name="childData">
            {() => (
                <div>
                    {formik.values.childData.map((child: TinitialObjestType, index: number) => (
                        <Grid container direction="row" alignItems="center" key={index} className={classes.container}>
                            <Grid container xs={4} direction="column">
                                <Typography
                                    variant={'body1'}
                                    className={classes.acctualKindergarden}
                                >{`${child.firstname} ${child.lastname}`}</Typography>
                                <Typography variant={'caption'}>
                                    {t('user-settings.modal-change-kindergarden.main-label')}
                                </Typography>
                                <Typography variant={'caption'}>
                                    {formik.initialValues.childData[index].kindergardenName}
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Select
                                    label={t('user-settings.modal-change-kindergarden.label')}
                                    value={formik.values.childData[index].kindergarden}
                                    options={kindergartenOptions}
                                    name={`childData[${index}]`}
                                    onChange={(name: string, value: string) => {
                                        const { id, firstname, lastname, birthYear, birthQuarter, sex } = child;
                                        const kindergarden = value;
                                        formik.setFieldValue(name, {
                                            id,
                                            kindergarden,
                                            firstname,
                                            lastname,
                                            birthYear,
                                            birthQuarter,
                                            sex,
                                        });
                                    }}
                                />
                            </Grid>
                        </Grid>
                    ))}
                </div>
            )}
        </FieldArray>
    );
};

const useStyles = makeStyles((theme: Theme) => ({
    acctualKindergarden: { marginBottom: theme.spacing(1) },
    container: { margin: theme.spacing(2, 0) },
}));
