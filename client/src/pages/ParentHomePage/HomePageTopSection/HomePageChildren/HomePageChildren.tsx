import { useState } from 'react';
import { makeStyles, createStyles, Theme, Grid } from '@material-ui/core';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import clsx from 'clsx';

import BoyAvatar from '../../../../assets/boy.svg';
import GirlAvatar from '../../../../assets/girl.svg';
import { Child, ChildInput } from '../../../../graphql/types';
import { HomePageAddChildButton } from '../HomePageAddChildButton/HomePageAddChildButton';
import { openAddChildModal } from '../../../../components/ChilModals/AddChildModal';
import { useKindergartens } from '../../../../operations/queries/Kindergartens/getKindergartens';
import { useIsDevice } from '../../../../queries/useBreakpoints';
import { HomePageInfo } from '../HomePageInfo';

import { HomePageChildCard } from './HomePageChildCard';

import 'pure-react-carousel/dist/react-carousel.es.css';

interface Props {
    childrenList: Child[];
    handleModalSubmit: (child: ChildInput) => void;
    onChildClick: (id: string) => void;
}

export const HomePageChildren = ({ childrenList: children, handleModalSubmit, onChildClick }: Props) => {
    const classes = useStyles();
    const { kindergartenList } = useKindergartens();
    const { isMobile } = useIsDevice();

    const [isInfoComponentVisible, setIsInfoComponentVisible] = useState(
        () => localStorage.getItem('infoNote') !== 'closed',
    );

    function toggleInfoComponent() {
        setIsInfoComponentVisible((prev) => !prev);
        localStorage.setItem('infoNote', 'closed');
    }

    return isMobile ? (
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
        <Grid
            container
            spacing={3}
            className={clsx({
                [classes.gridContainer]: true,
                [classes.gridContainerMobile]: children.length > 1,
            })}
        >
            {children.map(({ firstname, _id, sex }) => {
                return (
                    <Grid item key={_id}>
                        <HomePageChildCard
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
            <Grid item>
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
            {isInfoComponentVisible && children.length <= 1 && (
                <Grid item>
                    <HomePageInfo childrenCount={children.length} toggleInfoComponent={toggleInfoComponent} />
                </Grid>
            )}
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
                            <HomePageChildCard
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
                <Slide index={childList.length}>
                    <HomePageAddChildButton onClick={onAddChildClick} />
                </Slide>
            </Slider>
        </CarouselProvider>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        childAvatar: {
            height: 120,
            width: '100%',
            objectFit: 'contain',
        },
        slide: {
            paddingRight: theme.spacing(2),
        },
        infoContainer: {
            display: 'flex',
            marginRight: theme.spacing(2),
            flexWrap: 'wrap',
        },
        gridContainer: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 2fr',
        },
        gridContainerMobile: {
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
        },
    }),
);
