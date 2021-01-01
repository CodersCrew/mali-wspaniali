import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core';
import { ActionDialog, DialogResult, openDialog } from '../../utils/openDialog';
import { AssignInstructorModal } from './AssignInstructorModal/AssignInstructorModal';
import { InstructorWithKindergartens } from './types';
import { Assessment, Kindergarten } from '../../graphql/types';

interface Props {
    instructor: InstructorWithKindergartens;
    assessment: Assessment;
    kindergartens: Kindergarten[];
    onSubmit: (kindergartensList: string[], instructorId: string) => void;
}

interface DecisionProps {
    handleSubmit: void;
}

export function openAssignInstructorModal({
    instructor,
    assessment,
    kindergartens,
    onSubmit,
}: Props): Promise<DialogResult> {
    return openDialog<{}, DecisionProps>(function ({ onClose, makeDecision }: ActionDialog<DecisionProps>) {
        const classes = useStyles();

        return (
            <div className={classes.container}>
                <AssignInstructorModal
                    onClose={onClose}
                    onSubmit={(selected) =>
                        makeDecision({
                            accepted: true,
                            handleSubmit: onSubmit(selected, instructor._id),
                        })
                    }
                    kindergartens={kindergartens}
                    instructor={instructor}
                    assessment={assessment}
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
