import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { Result } from '../../../firebase/types';
import { useAuthorization } from '../../../hooks/useAuthorization';
import { useSubscribed } from '../../../hooks/useSubscribed';
import { OnSnapshotCallback } from '../../../firebase/userRepository';
import { fetchChildResults } from '../../../queries/childQueries';
import { ResultSummary } from './ResultSummary';
import { getGroupedResults } from './utils';
import { gray } from '../../../colors';
import { ResultDetails } from './ResultDetails';
import { ResultComparison } from './ResultComparison';
import { EmptyResultSimple } from './EmptyResultSimple';
import { EmptyResultDetailed } from './EmptyResultDetailed';

export const ChildProfileResults = ({ onNoResultClick }: { onNoResultClick(): void }) => {
    useAuthorization(true);
    const classes = useStyles();
    const { childId } = useParams<{ childId: string }>();
    const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

    const results = useSubscribed<Result[] | null, string>(
        (callback: OnSnapshotCallback<Result[]>) => fetchChildResults(childId, callback),
        null,
        [childId],
    ) as Result[];

    const handleClickSummary = (key: string) => {
        if (!expandedGroups.includes(key)) {
            setExpandedGroups([...expandedGroups, key]);
        }
    };

    const handleClickDetailsButton = (key: string) => {
        if (expandedGroups.includes(key)) {
            setExpandedGroups(expandedGroups.filter(groupKey => groupKey !== key));
            return;
        }

        setExpandedGroups([...expandedGroups, key]);
    };

    const groupedResults = getGroupedResults(results);

    return (
        <>
            {Object.keys(groupedResults)
                .sort((a, b) => Number(b) - Number(a))
                .map((key, index) => {
                    const isExpanded = expandedGroups.includes(key);
                    const sortedResults = groupedResults[key].sort(
                        (resultA: Result, resultB: Result) => +resultA.dateOfTest - +resultB.dateOfTest,
                    ) as Result[];
                    const isLast = index === Object.keys(groupedResults).length - 1;

                    return (
                        <ExpansionPanel key={key} expanded={isExpanded} className={classes.expansionPanel}>
                            <ExpansionPanelSummary
                                onClick={() => handleClickSummary(key)}
                                className={clsx(
                                    classes.expansionPanelSummary,
                                    isExpanded && classes.expansionPanelSummaryExpanded,
                                )}
                            >
                                <ResultSummary
                                    resultGroup={groupedResults[key]}
                                    schoolYearStart={Number(key)}
                                    handleClickDetailsButton={handleClickDetailsButton}
                                    isExpanded={isExpanded}
                                />
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                                {sortedResults.length > 0 &&
                                    sortedResults.map((result, idx) => (
                                        <ResultDetails
                                            result={result}
                                            key={String(result.dateOfTest)}
                                            previousResult={sortedResults[idx - 1]}
                                        />
                                    ))}
                                {sortedResults.length >= 2 && (
                                    <ResultComparison
                                        firstResultPoints={sortedResults[0].sumOfPoints}
                                        lastResultPoints={sortedResults[sortedResults.length - 1].sumOfPoints}
                                        childAge={sortedResults[sortedResults.length - 1].ageOfChild}
                                    />
                                )}
                                {sortedResults.length === 0 && !isLast && (
                                    <EmptyResultSimple />
                                )}
                                {sortedResults.length === 0 && isLast && (
                                    <EmptyResultDetailed
                                        onNoResultClick={onNoResultClick}
                                    />
                                )}
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    );
                })}
        </>
    );
};

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
