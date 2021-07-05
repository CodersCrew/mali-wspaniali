import { Accordion, AccordionSummary, AccordionDetails, makeStyles, Theme, createStyles } from '@material-ui/core';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { SummarisedGroupedTest } from './SummarisedGroupedTest/SummarisedGroupedTest';
import { ResultComparison } from './ExtendedGroupedTest/ResultComparison';
import { SingleTest } from './ExtendedGroupedTest/SingleTest';
import { AssessmentResult } from '../../../graphql/types';
import { countSumOfPoints } from '../../../utils/countSumOfPoints';

interface Props {
    test: AssessmentResult;
    isExpanded: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export function GroupedTests({ isExpanded, onOpen, onClose, test }: Props) {
    const classes = useStyles();

    return (
        <Accordion expanded={isExpanded} className={classes.expansionPanel}>
            <AccordionSummary
                onClick={onOpen}
                className={clsx({
                    [classes.expansionPanelSummary]: true,
                    [classes.expansionPanelSummaryExpanded]: isExpanded,
                })}
            >
                <SummarisedGroupedTest test={test} onClose={onClose} isExpanded={isExpanded} />
            </AccordionSummary>
            <AccordionDetails className={classes.expansionPanelDetails}>
                <GetTestSections test={test} />
            </AccordionDetails>
        </Accordion>
    );
}

function GetTestSections(props: { test: AssessmentResult }) {
    const { t } = useTranslation();
    const { sumOfPointsFirstMeasurement, sumOfPointsLastMeasurement } = countSumOfPoints(props.test);

    return (
        <>
            <SingleTest
                result={props.test}
                title={t('child-profile.initial-test')}
                description={t('child-profile.initial-fitness-level')}
                points={sumOfPointsFirstMeasurement}
                prefix="first"
            />
            {props.test && (
                <>
                    <SingleTest
                        result={props.test}
                        title={t('child-profile.final-test')}
                        description={t('child-profile.final-fitness-level')}
                        points={sumOfPointsLastMeasurement}
                        prefix="last"
                    />
                    <ResultComparison
                        params={props.test.currentParams}
                        firstResultPoints={sumOfPointsFirstMeasurement}
                        lastResultPoints={sumOfPointsLastMeasurement}
                        childAge={5}
                    />
                </>
            )}
        </>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        expansionPanel: {
            marginTop: 0,
        },
        expansionPanelSummary: {
            padding: 0,
        },
        expansionPanelSummaryExpanded: {
            cursor: 'default',
        },
        expansionPanelDetails: {
            flexDirection: 'column',
            [theme.breakpoints.down('xs')]: {
                display: 'flex',
                alignItems: 'center',
            },
        },
    }),
);
