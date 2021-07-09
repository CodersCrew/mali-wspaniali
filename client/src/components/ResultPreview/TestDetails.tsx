import { makeStyles } from '@material-ui/styles';
import { createStyles, Theme, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { CarouselProvider, DotGroup, Slide, Slider } from 'pure-react-carousel';
import { TESTS } from './constants';
import { Measurement } from '../../pages/ChildProfile/ChildProfileResults/ExtendedGroupedTest/Measurement';
import { AssessmentResult, Child } from '../../graphql/types';
import { useIsDevice } from '../../queries/useBreakpoints';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { countCurrentPoints } from '../../pages/InstructorResultCreatorPage/countPoints';

export const TestDetails = (props: { result: AssessmentResult; prefix: string; child: Child }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { isSmallMobile } = useIsDevice();
    const { child, result, prefix } = props;

    const points = countCurrentPoints(
        {
            run: result[`${prefix}MeasurementRunResult` as keyof AssessmentResult] as number,
            pendelumRun: result[`${prefix}MeasurementPendelumRunResult` as keyof AssessmentResult] as number,
            jump: result[`${prefix}MeasurementJumpResult` as keyof AssessmentResult] as number,
            throw: result[`${prefix}MeasurementThrowResult` as keyof AssessmentResult] as number,
        },
        result.currentParams,
    );

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
            >
                <Slider className={classes.slider}>
                    {TESTS.map((test, index) => {
                        const param = result.currentParams[lowercaseFirstLetter(test.name) as 'run'];
                        const normalizedName = lowercaseFirstLetter(test.name) as keyof typeof points;

                        if (!param) return null;

                        return (
                            <Slide index={index} key={test.translationKey} className={classes.slide}>
                                <Measurement
                                    name={normalizedName}
                                    child={child}
                                    param={param}
                                    valueInUnitOfMeasure={
                                        (result[
                                            `${prefix}Measurement${normalizedName}Result` as keyof AssessmentResult
                                        ] as number) || 0
                                    }
                                    valueInPoints={points[normalizedName]}
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
                    const valueInUnitOfMeasure =
                        (result[`${prefix}Measurement${test.name}Result` as keyof AssessmentResult] as number) || 0;
                    const normalizedName = lowercaseFirstLetter(test.name) as keyof typeof points;
                    const param = result.currentParams[normalizedName];

                    if (!param) return null;

                    return (
                        <Measurement
                            name={normalizedName}
                            child={child}
                            param={param}
                            valueInUnitOfMeasure={valueInUnitOfMeasure}
                            valueInPoints={valueInUnitOfMeasure ? points[normalizedName] : 0}
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
                {prefix === 'first' ? t('child-profile.initial-test-title') : t('child-profile.final-test-title')}:
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

function lowercaseFirstLetter(text: string) {
    return text.charAt(0).toLowerCase() + text.slice(1);
}
