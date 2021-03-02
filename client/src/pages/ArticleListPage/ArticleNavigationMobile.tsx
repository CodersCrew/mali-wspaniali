import { makeStyles, Theme, createStyles, Typography } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useTranslation } from 'react-i18next';

import { ButtonDefault } from '../../components/Button/ButtonDefault';

interface Props {
    onClick: () => void;
}

export function ArticleNavigationMobile({ onClick }: Props) {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <ButtonDefault onClick={onClick}>
                <ArrowBackIosIcon />
                <Typography>{t('blog-navigation.back')}</Typography>
            </ButtonDefault>
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            alignItems: 'center',
            padding: `0 ${theme.spacing(3)}px`,
            height: theme.spacing(6),
            backgroundColor: theme.palette.primary.main,
        },
    }),
);
