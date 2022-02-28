import { makeStyles } from '@material-ui/styles';
import { createStyles, Theme, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { CarouselProvider, DotGroup, Slide, Slider } from 'pure-react-carousel';
import { TESTS } from './constants';
import { Measurement } from '../../pages/ChildProfile/ChildProfileResults/ExtendedGroupedTest/Measurement';
import { useIsDevice } from '../../queries/useBreakpoints';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { MeasurementName } from './calculateResult';

export const TestDetails = (props: { prefix: string }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { isSmallMobile } = useIsDevice();

    const measurementScoresCharts = () => {
        return isSmallMobile ? (
            <CarouselProvider
                className={classes.carouselProvider}
                naturalSlideHeight={120}
                naturalSlideWidth={80}
                totalSlides={TESTS.length + 0.5}
                // we need to add 0.5 to the amount of total slides to properly work dots because we display 1.5 slides
                visibleSlides={1.5}
                infinite
                touchEnabled
                dragEnabled
            >
                <Slider className={classes.slider}>
                    {TESTS.map((test, index) => {
                        return (
                            <Slide index={index} key={test.translationKey} className={classes.slide}>
                                <Measurement
                                    prefix={props.prefix}
                                    name={test.name as MeasurementName}
                                    unitOfMeasure={test.unitOfMeasure}
                                    translationKey={test.translationKey}
                                    key={test.translationKey}
                                />
                            </Slide>
                        );
                    })}
                </Slider>
                <DotGroup className={classes.dotGroup} showAsSelectedForCurrentSlideOnly />
            </CarouselProvider>
        ) : (
            <div className={classes.chartsWrapper}>
                {TESTS.map((test) => {
                    return (
                        <Measurement
                            prefix={props.prefix}
                            name={test.name as MeasurementName}
                            unitOfMeasure={test.unitOfMeasure}
                            translationKey={test.translationKey}
                            key={test.translationKey}
                        />
                    );
                })}
            </div>
        );
    };

    return (
        <div className={classes.wrapper}>
            <Typography className={classes.title} variant="subtitle1">
                {props.prefix === 'first' ? t('child-profile.initial-test-title') : t('child-profile.final-test-title')}
                :
            </Typography>
            {measurementScoresCharts()}
        </div>
    );
};

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            margin: theme.spacing(1),
            [theme.breakpoints.down('sm')]: {
                marginTop: theme.spacing(6),
            },
        },
        title: {
            marginBottom: theme.spacing(1),
            [theme.breakpoints.down('sm')]: {
                marginBottom: theme.spacing(3),
            },
            [theme.breakpoints.down('xs')]: {
                textAlign: 'left',
            },
        },
        chartsWrapper: {
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            [theme.breakpoints.down('sm')]: {
                gridTemplateColumns: `repeat(auto-fill, minmax(${theme.spacing(23)}px, 1fr))`,
            },
        },
        carouselProvider: {
            marginLeft: '15vw',
        },
        slider: {
            minHeight: theme.spacing(60),
            paddingBottom: theme.spacing(2),
        },
        slide: {
            minHeight: theme.spacing(54),
        },
        dotGroup: {
            marginTop: theme.spacing(1),
            display: 'flex',
            justifyContent: 'center',
            height: theme.spacing(4),
            padding: theme.spacing(1),
            '& .carousel__dot--selected': {
                backgroundColor: theme.palette.grey['500'],
            },
            '& > button': {
                borderRadius: '50%',
                margin: theme.spacing(0.5),
                padding: theme.spacing(0.8),
                backgroundColor: theme.palette.grey['300'],
                border: 'none',
            },
            '& > button:last-child': {
                display: 'none',
                // we displaying more dots than slides so we need last hide
            },
        },
    }),
);
