import {
    Typography,
    Box,
    InputLabel,
    TextField,
    MenuItem,
    Select,
    makeStyles,
    Theme,
    createStyles,
    FormControl,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useFormikContext, ErrorMessage } from 'formik';

import { articleCategories } from '../utils';
import { ArticleCategoryOptions } from '../types';

export const ArticleInformationForm = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const formik = useFormikContext();

    return (
        <div>
            <Typography variant="h3" className={classes.heading}>
                {t('admin-articles.article-information')}
            </Typography>
            <Box className={classes.box}>
                <TextField
                    {...formik.getFieldProps('title')}
                    className={classes.input}
                    variant="outlined"
                    label="Tytuł artykułu"
                    fullWidth
                    multiline
                />
                <ErrorMessage name="title">{(msg) => <div className={classes.error}>{msg}</div>}</ErrorMessage>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel>Kategoria</InputLabel>
                    <Select
                        label="Kategoria"
                        {...formik.getFieldProps('category')}
                        autoWidth
                        className={classes.input}
                        variant="outlined"
                    >
                        {articleCategories().map((option: ArticleCategoryOptions) => {
                            return (
                                <MenuItem value={option.value} key={option.value}>
                                    <span>{option.label}</span>
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
                <ErrorMessage name="category">{(msg) => <div className={classes.error}>{msg}</div>}</ErrorMessage>
                <TextField
                    {...formik.getFieldProps('pictureUrl')}
                    name="pictureUrl"
                    className={classes.input}
                    variant="outlined"
                    label="Adres Url"
                    fullWidth
                    multiline
                />
                <ErrorMessage name="pictureUrl">{(msg) => <div className={classes.error}>{msg}</div>}</ErrorMessage>
                <TextField
                    {...formik.getFieldProps('description')}
                    name="description"
                    variant="outlined"
                    label={t('admin-articles.description')}
                    fullWidth
                    multiline
                    className={classes.input}
                />
                <ErrorMessage name="description">{(msg) => <div className={classes.error}>{msg}</div>}</ErrorMessage>
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
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
    }),
);
