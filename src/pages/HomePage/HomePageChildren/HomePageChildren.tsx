/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import { HomePageChildCard } from './HomePageChildCard';
import { HomePageInfo } from './HomePageInfo';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { getChildrenData } from '../../../queries/childQueries';
import { Child } from '../../../firebase/types';

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
            <div className={classes.childrenContainer}>
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
            </div>
            <div>
                <HomePageInfo />
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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

            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
                paddingRight: 0,
                marginBottom: 30,
            },
        },
        childrenContainer: {
            display: 'flex',

            [theme.breakpoints.down('sm')]: {
                justifyContent: 'space-around',
                paddingLeft: 20,
                paddingRight: 20,
            },
        },
    }),
);
