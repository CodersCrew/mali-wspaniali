import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { HomePageChildCard } from './HomePageChildCard';
import { HomePageInfo } from '../HomePageInfo';
import BoyAvatar from '../../../../assets/boy.png';
import GirlAvatar from '../../../../assets/girl.png';
import { Child } from '../../../../graphql/types';
import { HomePageAddChildButton } from '../HomePageAddChildButton/HomePageAddChildButton';
import { AddChildModal } from '../../../../components/AddChildModal/AddChildModal';
import { useKindergartens } from '../../../../operations/queries/Kindergartens/getKindergartens';
import { AddChildResult } from '../../../../components/AddChildModal/AddChildModal.types';

interface Props {
    childrenList: Child[];
    handleModalSubmit: (child: AddChildResult) => void;
}

export const HomePageChildren = ({ childrenList: children, handleModalSubmit }: Props) => {
    const classes = useStyles();
    const [isInfoComponentVisible, setIsInfoComponentVisible] = useState(true);

    const toggleInfoComponent = () => setIsInfoComponentVisible(!isInfoComponentVisible);

    const { kindergartenList } = useKindergartens();
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalReset = () => {
        setModalOpen(false);
    };

    const handleAddChildButtonClick = () => {
        setModalOpen(true);
    };

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
                <span>
                    <HomePageAddChildButton onClick={handleAddChildButtonClick} />
                </span>
            </div>
            {kindergartenList && (
                <AddChildModal
                    handleSubmit={handleModalSubmit}
                    handleReset={handleModalReset}
                    isOpen={modalOpen}
                    kindergartens={kindergartenList}
                    isCancelButtonVisible={true}
                />
            )}
            <div className={classes.infoContainer}>
                {isInfoComponentVisible && <HomePageInfo toggleInfoComponent={toggleInfoComponent} />}
            </div>
        </>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        childAvatar: {
            width: '122px',
            height: '126px',
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
            marginBottom: 40,
            flexWrap: 'wrap',

            [theme.breakpoints.down('md')]: {
                flexDirection: 'column',
                alignItems: 'center',
                paddingRight: 0,
                marginBottom: 30,
            },
        },
        childrenContainer: {
            display: 'flex',
            flexWrap: 'wrap',

            [theme.breakpoints.down('md')]: {
                justifyContent: 'space-around',
                paddingLeft: 16,
                paddingRight: 20,
            },

            [theme.breakpoints.down('sm')]: {
                justifyContent: 'center',
                alignItems: 'center',
            },
        },
    }),
);
