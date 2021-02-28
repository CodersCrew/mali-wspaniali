import { Accordion, AccordionSummary, AccordionDetails, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

import { SummarisedGroupedTest } from './SummarisedGroupedTest/SummarisedGroupedTest';
import { ResultComparison } from './ExtendedGroupedTest/ResultComparison';
import { gray } from '../../../colors';
import { SingleTest } from './ExtendedGroupedTest/SingleTest';
import { TestResult } from '../../../graphql/types';
import { countSumOfPoints } from '../../../utils/countSumOfPoints';

interface Props {
    isExpanded: boolean;
    onOpen: () => void;
    onClose: () => void;
    date: Date;
    tests: TestResult[];
}

export const GroupedTests = ({ isExpanded, onOpen, date, onClose, tests }: Props) => {
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
                <SummarisedGroupedTest
                    schoolYearStart={date.getFullYear()}
                    onClose={onClose}
                    isExpanded={isExpanded}
                    date={date}
                />
            </AccordionSummary>
            <AccordionDetails className={classes.expansionPanelDetails}>{getTestSections(tests)}</AccordionDetails>
        </Accordion>
    );
};

function getTestSections(tests: TestResult[]) {
    const [startTest, endTest] = tests;

    return (
        <>
            <SingleTest result={startTest} />
            {endTest && (
                <>
                    <SingleTest result={endTest} />
                    <ResultComparison
                        firstResultPoints={countSumOfPoints(startTest.test)}
                        lastResultPoints={countSumOfPoints(endTest.test)}
                        childAge={startTest.test.childAge}
                    />
                </>
            )}
        </>
    );
}

const useStyles = makeStyles({
    expansionPanel: {
        marginTop: 0,
    },
    expansionPanelSummary: {
        padding: 0,
    },
    expansionPanelSummaryExpanded: {
        cursor: 'default',
        borderBottom: `1px solid ${gray}`,
    },
    expansionPanelDetails: {
        flexDirection: 'column',
    },
});
