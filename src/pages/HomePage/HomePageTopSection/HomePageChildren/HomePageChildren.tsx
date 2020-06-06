import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { User } from 'firebase';
import { HomePageChildCard } from './HomePageChildCard';
import { HomePageInfo } from '../HomePageInfo';
import { getChildrenByUserId } from '../../../../queries/childQueries';
import { Child } from '../../../../firebase/types';
import { useSubscribed } from '../../../../hooks/useSubscribed';
import { OnSnapshotCallback } from '../../../../firebase/userRepository';
import { useAuthorization } from '../../../../hooks/useAuthorization';
import BoyAvatar from '../../../../assets/boy.png';
import GirlAvatar from '../../../../assets/girl.png';

const smHeight = window.screen.height <= 840 && window.screen.width > 1024;
const mdHeight = window.screen.height < 905 && window.screen.width > 1024;

const avatarHeight = smHeight ? '100px' : mdHeight ? '113px' : '126px';

export const HomePageChildren = () => {
    const currentUser = useAuthorization(true);
    const classes = useStyles();
    const [isInfoComponentVisible, setIsInfoComponentVisible] = useState(true);

    const children = useSubscribed<Child[], User | null>(
        (callback: OnSnapshotCallback<Child[]>) => {
            if (currentUser) {
                getChildrenByUserId(currentUser.uid, callback);
            }
        },
        [],
        [currentUser],
    ) as Child[];

    const toggleInfoComponent = () => setIsInfoComponentVisible(!isInfoComponentVisible);

    return (
        <div className={classes.infoContainer}>
            <div className={classes.childrenContainer}>
                {children &&
                    children.map(({ firstName, id, sex }) => {
                        const PictureComponent = (
                            <img
                                className={classes.childAvatar}
                                alt="mali_wspaniali_child"
                                src={sex === 'male' ? BoyAvatar : GirlAvatar}
                            />
                        );
                        return (
                            <HomePageChildCard
                                key={id}
                                firstName={firstName}
                                id={id}
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
            height: avatarHeight,
            objectFit: 'contain',
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
            marginBottom: smHeight ? 30 : 40,
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
