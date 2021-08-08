import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import dayjs from '../../localizedMoment';

interface Props {
    readingTime: number;
    date: Date;
}

export function ReadingTime({ readingTime, date }: Props) {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <span className={classes.container}>
            <Typography variant="overline">{dayjs(date).format('L')}</Typography>
            <div className={classes.ellipse}>&nbsp;</div>
            <Typography variant="overline">
                {readingTime} {t('single-article.reading-time')}
            </Typography>
        </span>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
        },
        ellipse: {
            background: theme.palette.grey[300],
            borderRadius: '50%',
            width: '12px',
            height: '12px',
            margin: `0 ${theme.spacing(1)}px`,
        },
    }),
);
