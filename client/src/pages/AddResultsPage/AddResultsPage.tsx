import React, { useEffect, useState } from 'react';
import { createStyles, Fab, makeStyles, Theme } from '@material-ui/core';
import { BarChart } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();

    const currentChildren =
        assessments
            .find(a => a._id === selectedAssessment)
            ?.kindergartens.find(k => k.kindergarten._id === selectedKindergarten)?.kindergarten.children || [];

    useEffect(() => {
        activePage(['instructor-menu.add-results']);
    }, []);

    useEffect(() => {
        const [assessment] = assessments;

        if (assessment) {
            setSelectedAssessment(assessment._id);

            setSelectedKindergarten(assessment.kindergartens[0]?.kindergarten._id);
        }
    }, [assessments]);

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
                                setSearchTerm(value);

                                return;
                            }

                            setSelectedKindergarten(value);
                        }}
                    />
                }
                container={
                    <ChildListContainer searchTerm={searchTerm} childList={currentChildren} />
                }
            />
            <Fab
                variant="extended"
                color="secondary"
                aria-label="add test result"
                className={classes.fab}
            >
                <BarChart />
                &nbsp;
                {t('add-results-page.add-result')}
            </Fab>
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: theme.spacing(3),
        },
        fab: {
            position: 'fixed',
            bottom: theme.spacing(3),
            right: theme.spacing(3),
        },
    }),
);
