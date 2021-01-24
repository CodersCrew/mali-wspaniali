import React from 'react';
import { makeStyles, createStyles, Theme, Grid } from '@material-ui/core';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';

import 'pure-react-carousel/dist/react-carousel.es.css';
import { ChildCard } from '../../components/ChildCard/ChildCard';
import BoyAvatar from '../../assets/boy.png';
import GirlAvatar from '../../assets/girl.png';
import { Child, ChildInput } from '../../graphql/types';
import { openAddChildModal } from '../../components/ChilModals/AddChildModal';
import { useKindergartens } from '../../operations/queries/Kindergartens/getKindergartens';
import { useIsDevice } from '../../queries/useBreakpoints';

import { HomePageAddChildButton } from './HomePageTopSection/HomePageAddChildButton/HomePageAddChildButton';

interface Props {
    childrenList: Child[];
    handleModalSubmit: (child: ChildInput) => void;
    onChildClick: (id: string) => void;
}

export const ChildCards = ({ childrenList: children, handleModalSubmit, onChildClick }: Props) => {
    const classes = useStyles();
    const device = useIsDevice();

    const { kindergartenList } = useKindergartens();

    return device.isMobile ? (
        <MobileCarousel
            childList={children}
            onAddChildClick={() => {
                openAddChildModal({
                    kindergartens: kindergartenList,
                    isCancelButtonVisible: true,
                }).then((results) => {
                    if (results.decision?.accepted) {
                        handleModalSubmit(results.decision.child);
                    }
                });
            }}
            onChildClick={onChildClick}
        />
    ) : (
        <Grid container spacing={3}>
            {children.map(({ firstname, _id, sex }) => {
                return (
                    <Grid item key={_id} xs={6} sm={3}>
                        <ChildCard
                            firstName={firstname}
                            PictureComponent={
                                <img
                                    className={classes.childAvatar}
                                    alt="mali_wspaniali_child"
                                    src={sex === 'male' ? BoyAvatar : GirlAvatar}
                                />
                            }
                            onClick={() => onChildClick(_id)}
                        />
                    </Grid>
                );
            })}
            <Grid item xs={6} sm={3}>
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
            </Grid>
        </Grid>
    );
};

interface MobileCarouselProps {
    childList: Child[];
    onAddChildClick: () => void;
    onChildClick: (id: string) => void;
}

function MobileCarousel({ childList, onAddChildClick, onChildClick }: MobileCarouselProps) {
    const classes = useStyles();
    console.log(classes);
    const { isSmallMobile } = useIsDevice();

    return (
        <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={100}
            totalSlides={childList.length + 1}
            visibleSlides={isSmallMobile ? 2 : 3}
            isIntrinsicHeight
        >
            <Slider style={{ height: '100%' }}>
                {childList.map(({ firstname, _id, sex }, i) => {
                    return (
                        <Slide index={i} key={_id} innerClassName={classes.slide}>
                            <ChildCard
                                firstName={firstname}
                                PictureComponent={
                                    <img
                                        className={classes.childAvatar}
                                        alt="mali_wspaniali_child"
                                        src={sex === 'male' ? BoyAvatar : GirlAvatar}
                                    />
                                }
                                onClick={() => onChildClick(_id)}
                            />
                        </Slide>
                    );
                })}
                <Slide index={childList.length} innerClassName={classes.slide}>
                    <HomePageAddChildButton onClick={onAddChildClick} />
                </Slide>
            </Slider>
        </CarouselProvider>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        childAvatar: {
            width: '100%',
            objectFit: 'contain',
        },
        slide: {
            paddingRight: theme.spacing(2),
        },
    }),
);
