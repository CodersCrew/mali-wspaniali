import React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme, Typography, Paper, Button, Box } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

import { useIsDevice } from '../../../../queries/useBreakpoints';

import { HomePageInfoPropTypes } from './types';

export const HomePageInfo = ({ toggleInfoComponent, childrenCount }: HomePageInfoPropTypes) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { isTablet } = useIsDevice();

    const [readMore, setReadMore] = useState(false);

    const toggleReadMore = () => {
        setReadMore((prevState) => !prevState);
    };

    return (
        <Paper
            className={clsx({
                [classes.infoContainer]: true,
                [classes.infoContainerReadMore]: readMore,
            })}
        >
            <Close className={classes.contentCloseIcon} onClick={() => toggleInfoComponent()} />
            <Typography variant="h4" className={classes.contentTitle}>
                {t('home-page-content.foundation-header')}
            </Typography>
            <div
                className={clsx({
                    [classes.contentDescription]: true,
                    [classes.contentDescriptionTablet]: isTablet && childrenCount <= 1,
                    [classes.contentReadMore]: readMore,
                })}
            >
                <Typography variant="body1">{t('home-page-content.foundation-content')}</Typography>
                <Box mb={2} />
                <Typography variant="body1">{t('home-page-content.foundation-content-summary')}</Typography>
            </div>
            <Button className={classes.link} onClick={toggleReadMore}>
                {t(readMore ? 'home-page-content.read-less' : 'home-page-content.read-more')}
            </Button>
        </Paper>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        infoContainer: {
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing(2),
            position: 'relative',
            textAlign: 'left',
            maxHeight: 189,

            [theme.breakpoints.down('md')]: {
                height: '100%',
            },
        },
        contentCloseIcon: {
            width: 14,
            height: 14,
            position: 'absolute',
            top: 14,
            right: 14,
            cursor: 'pointer',

            [theme.breakpoints.down('md')]: {
                width: 20,
                height: 20,
                top: 10,
                right: 10,
            },
        },
        contentTitle: {
            marginBottom: theme.spacing(2),
        },
        contentDescription: {
            flexDirection: 'column',
            marginBottom: theme.spacing(2),

            display: '-webkit-box',
            WebkitLineClamp: 4,
            '-webkit-box-orient': 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        contentDescriptionTablet: {
            WebkitLineClamp: 2,
        },
        link: {
            color: theme.palette.primary.main,
            textTransform: 'uppercase',
            margin: 0,
            padding: theme.spacing(0, 1),
            width: 'auto',
            alignSelf: 'flex-end',
        },
        contentReadMore: {
            display: 'flex',
            overflow: 'visible',
        },
        infoContainerReadMore: {
            maxHeight: 'none',
        },
    }),
);
