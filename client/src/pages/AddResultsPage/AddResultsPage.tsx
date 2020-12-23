import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

import { activePage } from '../../apollo_client';
import { useAssessments } from '../../operations/queries/Assessment/getAllAssessments';
import { CustomContainer } from '../../components/CustomContainer';
import { ChildListHeader } from './ChildListHeader';
import { ChildListContainer } from './ChildListContainer';

export function AddResultsPage() {
    const { assessments } = useAssessments({ withChildren: true });
    const [selectedAssessment, setSelectedAssessment] = useState('');
    const [selectedKindergarten, setSelectedKindergarten] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const classes = useStyles();

    const currentChildren = assessments.find(a => a._id === selectedAssessment)?.kindergartens
                                        .find(k => k.kindergarten._id === selectedKindergarten)?.kindergarten.children || []

    useEffect(() => {
        activePage(['instructor-menu.add-results']);
    }, []);

    useEffect(() => {
        const [assessment] = assessments;

        if (assessment) {
            setSelectedAssessment(assessment._id)

            setSelectedKindergarten(assessment.kindergartens[0]?.kindergarten._id)
        }
    }, [assessments])

    return (
        <div className={classes.container}>
            <CustomContainer
            header={
                <ChildListHeader
                    assessments={assessments}
                    selectedAssessment={selectedAssessment}
                    selectedKindergarten={selectedKindergarten}
                    searchTerm={searchTerm}
                    onChange={({ type, value }) => {
                        if (type === 'assessment') {
                            setSelectedAssessment(value);

                            return;
                        }

                        if (type === 'searchTerm') {
                            setSearchTerm(value)

                            return
                        }

                        setSelectedKindergarten(value);
                    }}
                />
            }
            container={
                <ChildListContainer searchTerm={searchTerm} childList={currentChildren} />
            }
        />
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: theme.spacing(3)
        },
    }),
);
