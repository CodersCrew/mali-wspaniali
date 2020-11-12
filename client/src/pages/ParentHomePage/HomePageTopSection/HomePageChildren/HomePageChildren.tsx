import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { HomePageChildCard } from './HomePageChildCard';
import { HomePageInfo } from '../HomePageInfo';
import BoyAvatar from '../../../../assets/boy.png';
import GirlAvatar from '../../../../assets/girl.png';
import { Child, ChildInput } from '../../../../graphql/types';
import { HomePageAddChildButton } from '../HomePageAddChildButton/HomePageAddChildButton';
import { AddChildModal } from '../../../../components/AddChildModal/AddChildModal';
import { useKindergartens } from '../../../../operations/queries/Kindergartens/getKindergartens';
import { ADD_CHILD } from '../../../../graphql/userRepository';
import { AddChildResult } from '../../../../components/AddChildModal/AddChildModal.types';

interface Props {
    childrenList: Child[];
}

export const HomePageChildren = ({ childrenList: children }: Props) => {
    const classes = useStyles();
    const [isInfoComponentVisible, setIsInfoComponentVisible] = useState(true);

    const toggleInfoComponent = () => setIsInfoComponentVisible(!isInfoComponentVisible);

    const { kindergartenList } = useKindergartens();
    const [addChild] = useMutation(ADD_CHILD);
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalSubmit = (child: AddChildResult) => {
        const newChild: ChildInput = {
            firstname: child.firstname,
            lastname: child.lastname,
            birthYear: parseInt(child['birth-date'], 10),
            sex: child.sex,
            kindergartenId: child.kindergarten,
        };

        addChild({
            variables: {
                child: newChild,
            },
        });
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
                <HomePageAddChildButton onClick={handleAddChildButtonClick} />
            </div>
            {kindergartenList && (
                <AddChildModal handleSubmit={handleModalSubmit} isOpen={modalOpen} kindergartens={kindergartenList} />
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
            marginLeft: 16,
            // padding: '0 50px 0 0',
            maxWidth: 1038,
            flexWrap: 'wrap',

            [theme.breakpoints.down('md')]: {
                flexDirection: 'column',
                alignItems: 'center',
                paddingRight: 0,
                marginBottom: 30,
            },
        },
        childrenContainer: {
            // TODO: remove this background color
            // backgroundColor: '#ccc',
            display: 'flex',
            flexWrap: 'wrap',
            marginLeft: 16,
            // marginBottom: 16,
            maxWidth: 1038,

            [theme.breakpoints.down('md')]: {
                justifyContent: 'space-around',
                paddingLeft: 16,
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
