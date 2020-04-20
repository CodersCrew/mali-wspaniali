import React, { useState, useEffect } from 'react';
import { Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';
import { getChildrenData } from '../../../queries/childQueries';
import { Child } from '../../../firebase/types';
import { HomePageChildCard } from './HomePageChildCard';
import { cardBackgroundColor } from '../../../colors';

export const HomePageChildren = () => {
    const classes = useStyles();
    const [children, setChildren] = useState<Child[]>();
    const [listeners, setListeners] = useState<(() => void)[]>([]);

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
                children.map(child => (
                    <HomePageChildCard firstname={child.firstName} avatar={child.avatar} userId={child.userId} />
                ))}
            <div className={classes.infoWrapper}>
                <span className={classes.infoImage}>
                    <img src={require('../../../img/mali_wspaniali_info.png')} alt="mali_wspaniali_boy" />
                </span>
                <div>
                    <span>
                        <Close className={classes.infoCloseIcon} />
                    </span>
                    <p className={classes.infoTitle}>Tutaj Nagłówek Fundacji</p>
                    <span>
                        Tutaj będzie krótkie wprowadzenie od Fundacji. Lorem Ipsum is simply dummy text of the printing
                        and typesetting industry. Lorem Ipsum has been the.Lorem Ipsum is simply dummy text of the
                        printing and typesetting industry. Lorem Ipsum has been the. Lorem Ipsum is simply dummy text of
                        the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and
                    </span>
                </div>
            </div>
        </div>
    );
};

const useStyles = makeStyles({
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
    infoCloseIcon: {
        width: 14,
        height: 14,
        position: 'absolute',
        top: 14,
        right: 14,
        cursor: 'pointer',
    },
});
