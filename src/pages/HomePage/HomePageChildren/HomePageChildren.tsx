/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import { Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { getChildrenData } from '../../../queries/childQueries';
import { Child } from '../../../firebase/types';
import { HomePageChildCard } from './HomePageChildCard';
import { cardBackgroundColor } from '../../../colors';

export const HomePageChildren = () => {
    const classes = useStyles();
    const [children, setChildren] = useState<Child[]>();
    const [listeners, setListeners] = useState<(() => void)[]>([]);
    const { t } = useTranslation();

    const waitForChildrenData = async () => {
        const { documents, unsubscribe } = await getChildrenData(2, null, null);
        if (unsubscribe) {
            setChildren(documents);
            setListeners([...listeners, unsubscribe]);
        }
    };

    const detachListeners = () => {
        listeners.forEach(listener => () => listener());
    };

    useEffect(() => {
        waitForChildrenData();
        return () => detachListeners();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={classes.infoContainer}>
            {children &&
                children.map(child => {
                    const { firstName, userId, avatar } = child;
                    const link = `child/:${userId}`;
                    const PictureComponent = (
                        <img className={classes.childAva} alt="mali_wspaniali_child" src={avatar} />
                    );
                    return (
                        <HomePageChildCard
                            key={userId}
                            firstname={firstName}
                            userId={userId}
                            link={link}
                            PictureComponent={PictureComponent}
                        />
                    );
                })}
            <div className={classes.infoWrapper}>
                <span className={classes.infoImage}>
                    <img src={require('../../../img/mali_wspaniali_info.png')} alt="mali_wspaniali_boy" />
                </span>
                <div className={classes.infoContent}>
                    <span>
                        <Close className={classes.infoCloseIcon} />
                    </span>
                    <p className={classes.infoTitle}>{t('home-page-content.foundation-header')}</p>
                    <span>{t('home-page-content.foundation-content')}</span>
                </div>
            </div>
        </div>
    );
};

const useStyles = makeStyles({
    childAva: {
        minWidth: '122px',
        height: '126px',
        objectFit: 'cover',
        borderRadius: '4px 4px 0px 0px',
    },
    infoContainer: {
        display: 'flex',
        marginBottom: 40,
        padding: '0 50px 0 0',
    },
    infoWrapper: {
        display: 'flex',
        boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.15)',
        borderRadius: '4px',
        background: cardBackgroundColor,
        padding: '20px 14px 20px 15px',
        position: 'relative',
        maxHeight: '163px',
    },
    infoImage: {
        marginRight: 15,
    },
    infoTitle: {
        margin: 0,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    infoContent: {
        overflow: 'hidden',
    },
    infoCloseIcon: {
        width: 14,
        height: 14,
        position: 'absolute',
        top: 14,
        right: 14,
        cursor: 'pointer',
    },
});
