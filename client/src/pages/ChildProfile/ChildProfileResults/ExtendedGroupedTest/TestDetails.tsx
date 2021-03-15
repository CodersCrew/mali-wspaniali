import {makeStyles} from '@material-ui/styles';
import {createStyles, Theme, Typography} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {CarouselProvider, DotGroup, Slide, Slider} from 'pure-react-carousel';
import {resultKey, TESTS} from './constants';
import {Measurement} from './Measurement';
import {NoResultsBlock} from './emptyViews/NoResultsBlock';
import {TestResult} from '../../../../graphql/types';
import {useIsDevice} from '../../../../queries/useBreakpoints';
import 'pure-react-carousel/dist/react-carousel.es.css';

export interface Props {
    result: TestResult;
}

export const TestDetails = ({ result }: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { isSmallMobile } = useIsDevice();

    if (!result) return null;

    const measurementScoresCharts = () => {
        return isSmallMobile ? (
            <CarouselProvider className={classes.carouselProvider}
                naturalSlideHeight={120}
                naturalSlideWidth={80}
                totalSlides={TESTS.length + 0.5 }
                // we need to add 0.5 to the amount of total slides to properly work dots because we display 1.5 slides
                visibleSlides={1.5} infinite>
                <Slider className={classes.slider}>
                    {TESTS.map((test, index) => (
                        <Slide index= {index} key={test.translationKey} className={classes.slide}>
                            <Measurement
                                valueInUnitOfMeasure={result.test[test.unitOfMeasureKey as keyof TestResult['test']] as number}
                                valueInPoints={result.test[test.pointsKey as keyof TestResult['test']] as number}
                                unitOfMeasure={test.unitOfMeasure}
                                scaleFrom={test.scaleFrom}
                                scaleTo={test.scaleTo}
                                translationKey={test.translationKey}
                                key={test.translationKey}
                            />
                        </Slide>
                    ))}
                </Slider>
                <DotGroup className={classes.dotGroup} showAsSelectedForCurrentSlideOnly/>
            </CarouselProvider>
        ) : (
            <div className={classes.chartsWrapper}>
                {TESTS.map((test) => (
                    <Measurement
                        valueInUnitOfMeasure={result.test[test.unitOfMeasureKey as keyof TestResult['test']] as number}
                        valueInPoints={result.test[test.pointsKey as keyof TestResult['test']] as number}
                        unitOfMeasure={test.unitOfMeasure}
                        scaleFrom={test.scaleFrom}
                        scaleTo={test.scaleTo}
                        translationKey={test.translationKey}
                        key={test.translationKey}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className={classes.wrapper}>
            <Typography className={classes.title} variant="subtitle1">
                {result.test.testPeriod === 'START'
                    ? t('child-profile.initial-test-title')
                    : t('child-profile.final-test-title')}
                :
            </Typography>
            {measurementScoresCharts()}
            <div>{getTestUnavailableReason(result)}</div>
        </div>
    );
};

function getTestUnavailableReason(result: TestResult) {
    const testsWithNoResult = TESTS.filter((test) => !result.test[test.pointsKey as resultKey]);

    return testsWithNoResult.map((test) => (
        <NoResultsBlock key={test.translationKey} translationKey={test.translationKey} />
    ));
}

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            margin: theme.spacing(1),
            [theme.breakpoints.down('sm')]: {
                marginTop: theme.spacing(6),
            }
        },
        title: {
            marginBottom: theme.spacing(1),
            [theme.breakpoints.down('sm')]: {
                marginBottom: theme.spacing(3),
            },
            [theme.breakpoints.down('xs')]: {
                textAlign: 'left'
            }
        },
        chartsWrapper: {
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            [theme.breakpoints.down('sm')]: {
                gridTemplateColumns: `repeat(auto-fill, minmax(${theme.spacing(23)}px, 1fr))`,
            }
        },
        carouselProvider: {
            marginLeft: '15vw'
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
            '& .carousel__dot--selected' : {
                backgroundColor: theme.palette.grey['500']
            },
            '& > button': {
                borderRadius: '50%',
                margin: theme.spacing(.5),
                padding: theme.spacing(.8),
                backgroundColor: theme.palette.grey['300'],
                border: 'none'
            },
            '& > button:last-child': {
                display: 'none'
                // we displaying more dots than slides so we need last hide
            }
        }
    }),
);
