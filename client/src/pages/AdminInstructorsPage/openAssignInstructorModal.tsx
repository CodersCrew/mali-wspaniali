import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core';
import { ActionDialog, DialogResult, openDialog } from '../../utils/openDialog';
import { AssignInstructorModal } from './AssignInstructorModal/AssignInstructorModal';
import { InstructorWithKindergartens } from './types';
import { Assessment, Kindergarten } from '../../graphql/types';

interface Props {
    instructor: InstructorWithKindergartens | null;
    assessment: Assessment | null;
    kindergartens: Kindergarten[];
}

interface DecisionProps {
    selectedKindergartens: string[];
    data: {
        id: string;
        assessment: {
            kindergartenId: string;
            instructorId: string;
        }[];
    };
}

export function openAssignInstructorModal({ instructor, assessment, kindergartens }: Props): Promise<DialogResult> {
    return openDialog<{}, DecisionProps>(function({ onClose, makeDecision }: ActionDialog<DecisionProps>) {
        const classes = useStyles();

        return (
            <div className={classes.container}>
                <AssignInstructorModal
                    onClose={onClose}
                    onSubmit={selected => makeDecision({ accepted: true, selectedKindergartens: selected, data: {
                        id: assessment?._id!,
                        assessment: selected.map(kindergartenId => ({
                            kindergartenId,
                            instructorId: instructor?._id!
                        }))  
                    } })}
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
