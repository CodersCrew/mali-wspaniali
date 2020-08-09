import React from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

import { SummarisedGroupedTest } from './SummarisedGroupedTest/SummarisedGroupedTest';
import { ResultComparison } from './ExtendedGroupedTest/ResultComparison';
import { gray } from '../../../colors';
import { SingleTest } from './ExtendedGroupedTest/SingleTest';
import { TestResult } from '../../../graphql/types';

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
        <ExpansionPanel expanded={isExpanded} className={classes.expansionPanel}>
            <ExpansionPanelSummary
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
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                {getTestSections(tests)}
            </ExpansionPanelDetails>
        </ExpansionPanel>
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

function countSumOfPoints(result: TestResult['test']) {
    const { agilityPoints, powerPoints, speedPoints, strengthPoints } = result;

    const sumOfPoints = agilityPoints + powerPoints + speedPoints + strengthPoints;

    return sumOfPoints;
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
