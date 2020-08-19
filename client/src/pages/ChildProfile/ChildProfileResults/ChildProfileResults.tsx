import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ExpansionPanelSummary, makeStyles } from '@material-ui/core';
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
import { ExpansionPanel } from '../../../components/ExpansionPanel';

export const ChildProfileResults = () => {
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

    if (!results || !results.length) {
        // TODO
        return <>NO DATA</>;
    }

    const groupedResults = getGroupedResults(results);

    return (
        <>
            {Object.keys(groupedResults).map(key => {
                const isExpanded = expandedGroups.includes(key);
                const sortedResults = groupedResults[key].sort(
                    (resultA, resultB) => +resultA.dateOfTest - +resultB.dateOfTest,
                );
                const childrenOfDetailsPanel = <div>
                    {sortedResults.map((result, index) => (
                        <ResultDetails
                            result={result}
                            key={String(result.dateOfTest)}
                            previousResult={sortedResults[index - 1]}
                        />
                    ))}
                    <ResultComparison
                        firstResultPoints={sortedResults[0].sumOfPoints}
                        lastResultPoints={sortedResults[sortedResults.length - 1].sumOfPoints}
                    />
                </div>;

                return (
                    <ExpansionPanel key={key} expanded={isExpanded} className={classes.expansionPanel} panelDetails={{className: classes.expansionPanelDetails, children: childrenOfDetailsPanel}}>
                        <ExpansionPanelSummary
                            onClick={() => handleClickSummary(key)}
                            className={clsx(
                                classes.expansionPanelSummary,
                                isExpanded && classes.expansionPanelSummaryExpanded,
                            )}
                        >
                            <ResultSummary
                                resultGroup={groupedResults[key]}
                                handleClickDetailsButton={handleClickDetailsButton}
                                isExpanded={isExpanded}
                            />
                        </ExpansionPanelSummary>
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
