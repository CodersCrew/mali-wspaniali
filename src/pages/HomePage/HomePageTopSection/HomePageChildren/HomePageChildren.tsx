import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { HomePageChildCard } from './HomePageChildCard';
import { HomePageInfo } from '../HomePageInfo/HomePageInfo';
import { getChildrenData } from '../../../../queries/childQueries';
import { Child } from '../../../../firebase/types';

export const HomePageChildren = () => {
    const classes = useStyles();
    const [children, setChildren] = useState<Child[]>();
    const [isInfoComponentVisible, setIsInfoComponentVisible] = useState(true);
    const [listeners, setListeners] = useState<(() => void)[]>([]);

    const waitForChildrenData = async () => {
        const { documents, unsubscribe } = await getChildrenData(5, null, null);
        if (unsubscribe) {
            setChildren(documents);
            setListeners([...listeners, unsubscribe]);
        }
    };

    const detachListeners = () => listeners.forEach(listener => () => listener());
    const toggleInfoComponent = () => setIsInfoComponentVisible(!isInfoComponentVisible);

    useEffect(() => {
        waitForChildrenData();
        return () => detachListeners(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={classes.infoContainer}>
            <div className={classes.childrenContainer}>
                {children &&
                    children.map(({ firstName, userId, avatar }) => {
                        const PictureComponent = (
                            <img className={classes.childAvatar} alt="mali_wspaniali_child" src={avatar} />
                        );
                        return (
                            <HomePageChildCard
                                key={userId}
                                firstname={firstName}
                                userId={userId}
                                PictureComponent={PictureComponent}
                            />
                        );
                    })}
            </div>
            {isInfoComponentVisible && <HomePageInfo toggleInfoComponent={toggleInfoComponent} />}
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        childAvatar: {
            width: '122px',
            height: '126px',
            objectFit: 'cover',
            borderRadius: '4px 4px 0px 0px',

            [theme.breakpoints.down('sm')]: {
                maxWidth: '90px',
                width: '90px',
                maxHeight: '90px',
                height: '90px',
            },
        },
        infoContainer: {
            display: 'flex',
            marginBottom: 40,
            padding: '0 50px 0 0',

            [theme.breakpoints.down('md')]: {
                flexDirection: 'column',
                alignItems: 'center',
                paddingRight: 0,
                marginBottom: 30,
            },
        },
        childrenContainer: {
            display: 'flex',

            [theme.breakpoints.down('md')]: {
                justifyContent: 'space-around',
                paddingLeft: 20,
                paddingRight: 20,
                maxWidth: 400,
            },

            [theme.breakpoints.down('sm')]: {
                justifyContent: 'center',
                alignItems: 'center',
            },
        },
    }),
);
