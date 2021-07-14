import 'react-quill/dist/quill.snow.css';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createStyles, makeStyles, Theme, Box } from '@material-ui/core';
import { useFormikContext } from 'formik';
import VisibilityIcon from '@material-ui/icons/Visibility';

import { ButtonSecondary } from '../../components/Button';

export const Navigation = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const formik = useFormikContext<any>();
    const classes = useStyles();

    const onPreview = () => {
        history.push('/admin/articles/create/preview', {
            article: { values: formik.values, isPreview: true },
        });
    };

    const onCancel = () => {
        history.push('/admin/articles/categories/all');
    };

    return (
        <Box className={classes.buttonsWrapper} mb={3}>
            <ButtonSecondary onClick={onPreview} startIcon={<VisibilityIcon />}>
                {t('admin-articles.preview')}
            </ButtonSecondary>
            <Box>
                <ButtonSecondary className={classes.cancel} onClick={onCancel}>
                    {t('admin-articles.cancel')}
                </ButtonSecondary>
                <ButtonSecondary variant="contained" type="submit">
                    {t('admin-articles.publish')}
                </ButtonSecondary>
            </Box>
        </Box>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            marginBottom: theme.spacing(2),
        },
        error: { color: theme.palette.error.dark, marginBottom: theme.spacing(2) },
        box: {
            padding: theme.spacing(2),
        },
        buttonsWrapper: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        cancel: {
            marginRight: theme.spacing(2),
        },
    }),
);
