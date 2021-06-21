import 'react-quill/dist/quill.snow.css';
import { useTranslation } from 'react-i18next';
import { Typography, Box, makeStyles, createStyles, TextField, Theme } from '@material-ui/core';
import { ErrorMessage, useFormikContext } from 'formik';

import { redactorData } from '../utils';

export const ArticleAuthorInformationForm = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const formik = useFormikContext();

    return (
        <div>
            <Typography variant="h3" className={classes.heading}>
                {t('admin-articles.author-information')}
            </Typography>
            <Box className={classes.box}>
                {redactorData.map(({ data, label }) => (
                    <div key={`redactor.${data}`}>
                        <TextField
                            key={data}
                            {...formik.getFieldProps(`redactor.${data}`)}
                            className={classes.input}
                            variant="outlined"
                            label={t(`admin-articles.${label}`)}
                            fullWidth
                        />
                        <ErrorMessage name={`redactor.${data}`}>
                            {(msg) => <div className={classes.error}>{msg}</div>}
                        </ErrorMessage>
                    </div>
                ))}
            </Box>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        heading: {
            padding: theme.spacing(2),
            borderBottom: 'solid 1px rgba(0, 0, 0, .3)',
        },
        error: { color: theme.palette.error.dark, marginBottom: theme.spacing(2) },
        box: {
            padding: theme.spacing(2),
        },

        input: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
    }),
);
