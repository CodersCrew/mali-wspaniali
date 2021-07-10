import { Accordion, AccordionSummary, AccordionDetails, makeStyles, Theme, createStyles } from '@material-ui/core';
import clsx from 'clsx';

import { SummarisedGroupedTest } from './SummarisedGroupedTest/SummarisedGroupedTest';
import { AssessmentResult, Child } from '../../../graphql/types';
import { ResultPreview } from '../../../components/ResultPreview/ResultPreview';

export function GroupedTests(props: {
    test: AssessmentResult;
    child: Child;
    isExpanded: boolean;
    resultId: string;
    onOpen: () => void;
    onClose: () => void;
}) {
    const classes = useStyles();

    return (
        <>
            <Accordion expanded={props.isExpanded} className={classes.expansionPanel}>
                <AccordionSummary
                    onClick={props.onOpen}
                    className={clsx({
                        [classes.expansionPanelSummary]: true,
                        [classes.expansionPanelSummaryExpanded]: props.isExpanded,
                    })}
                >
                    <SummarisedGroupedTest test={props.test} onClose={props.onClose} isExpanded={props.isExpanded} />
                </AccordionSummary>
                <AccordionDetails className={classes.expansionPanelDetails}>
                    <ResultPreview resultId={props.resultId} />
                </AccordionDetails>
            </Accordion>
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
