import React, { useEffect, useState } from 'react';
import { createStyles, Fab, makeStyles, Theme } from '@material-ui/core';
import { BarChart } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { activePage } from '../../apollo_client';
import { useAssessments } from '../../operations/queries/Assessment/getAllAssessments';
import { CustomContainer } from '../../components/CustomContainer';
import { ChildListHeader } from './ChildListHeader';
import { ChildListContainer } from './ChildListContainer';
import { PageContainer } from '../../components/PageContainer';
import { openAddNoteDialog } from './AddNoteDialog';

export function InstructorAddResultsPage() {
    const { assessments } = useAssessments({ withChildren: true });
    const [selectedAssessment, setSelectedAssessment] = useState('');
    const [selectedKindergarten, setSelectedKindergarten] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const classes = useStyles();
    const { t } = useTranslation();
    const history = useHistory();

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
        <PageContainer>
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
                    <ChildListContainer searchTerm={searchTerm} childList={currentChildren} onClick={(type, value) => {
                        if (type === 'add-first-assessment-result') {
                            history.push(`/instructor/result/add/first/${selectedAssessment}/${selectedKindergarten}/${value}`)
                        }
                        
                        if (type === 'add-last-assessment-result') {
                            history.push(`/instructor/result/add/last/${selectedAssessment}/${selectedKindergarten}/${value}`)
                        }

                        if (type === 'add-first-assessment-note') {
                            openAddNoteDialog({ title: t('add-results-page.note-first-measurement'), note: ''})
                        }
                        
                        if (type === 'add-last-assessment-note') {
                            openAddNoteDialog({ title: t('add-results-page.note-last-measurement'),note: ''})
                        }

                    

                    }} />
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
        </PageContainer>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fab: {
            position: 'fixed',
            bottom: theme.spacing(3),
            right: theme.spacing(3),
        },
    }),
);
