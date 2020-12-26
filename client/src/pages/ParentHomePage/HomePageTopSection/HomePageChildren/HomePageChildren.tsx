import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { HomePageChildCard } from './HomePageChildCard';
import { HomePageInfo } from '../HomePageInfo';
import BoyAvatar from '../../../../assets/boy.png';
import GirlAvatar from '../../../../assets/girl.png';
import { Child, ChildInput } from '../../../../graphql/types';
import { HomePageAddChildButton } from '../HomePageAddChildButton/HomePageAddChildButton';
import { openAddChildModal } from '../../../../components/AddChildModal/AddChildModal';
import { useKindergartens } from '../../../../operations/queries/Kindergartens/getKindergartens';

interface Props {
    childrenList: Child[];
    handleModalSubmit: (child: ChildInput) => void;
}

export const HomePageChildren = ({ childrenList: children, handleModalSubmit }: Props) => {
    const classes = useStyles();
    const [isInfoComponentVisible, setIsInfoComponentVisible] = useState(true);

    const toggleInfoComponent = () => setIsInfoComponentVisible(!isInfoComponentVisible);

    const { kindergartenList } = useKindergartens();

    return (
        <>
            <div className={classes.childrenContainer}>
                {children.map(({ firstname, _id, sex }) => {
                    const PictureComponent = (
                        <img
                            className={classes.childAvatar}
                            alt="mali_wspaniali_child"
                            src={sex === 'male' ? BoyAvatar : GirlAvatar}
                        />
                    );

                    return (
                        <HomePageChildCard
                            key={_id}
                            id={_id}
                            firstName={firstname}
                            PictureComponent={PictureComponent}
                        />
                    );
                })}
                <HomePageAddChildButton
                    onClick={() => {
                        openAddChildModal({
                            kindergartens: kindergartenList,
                            isCancelButtonVisible: true,
                        }).then((results) => {
                            if (results.decision?.accepted) {
                                handleModalSubmit(results.decision.child);
                            }
                        });
                    }}
                />
            </div>
            <div className={classes.infoContainer}>
                {isInfoComponentVisible && <HomePageInfo toggleInfoComponent={toggleInfoComponent} />}
            </div>
        </>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        childAvatar: {
            width: 122,
            height: 126,
            objectFit: 'contain',
            borderRadius: theme.spacing(0.5, 0),

            [theme.breakpoints.down('sm')]: {
                maxWidth: 90,
                width: 90,
                maxHeight: 90,
                height: 90,
            },
        },
        infoContainer: {
            display: 'flex',
            marginBottom: theme.spacing(5),
            flexWrap: 'wrap',

            [theme.breakpoints.down('md')]: {
                flexDirection: 'column',
                alignItems: 'center',
                paddingRight: theme.spacing(0),
                marginBottom: theme.spacing(4),
            },
        },
        childrenContainer: {
            display: 'flex',
            flexWrap: 'wrap',

            [theme.breakpoints.down('md')]: {
                justifyContent: 'space-around',
            },

            [theme.breakpoints.down('sm')]: {
                justifyContent: 'center',
                alignItems: 'center',
            },
        },
    }),
);
