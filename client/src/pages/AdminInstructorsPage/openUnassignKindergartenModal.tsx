import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core';
import { ActionDialog, DialogResult, openDialog } from '../../utils/openDialog';
import { UnassignKidnergartenModal } from './UnassignKindergartenModal';

interface Props {
    kindergartenId: string;
}

interface DecisionProps {
    kindergartenId: string;
}

export function openUnassignKindergartenModal({ kindergartenId }: Props): Promise<DialogResult> {
    return openDialog<{}, DecisionProps>(function({ onClose, makeDecision }: ActionDialog<DecisionProps>) {
        const classes = useStyles();

        return (
            <div className={classes.container}>
                <UnassignKidnergartenModal
                    onClose={onClose}
                    onDelete={() => makeDecision({ kindergartenId })}
                    kindergartenId={kindergartenId}
                />
            </div>
        );
    }, {});
}

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            zIndex: 10000,
        },
    }),
);
