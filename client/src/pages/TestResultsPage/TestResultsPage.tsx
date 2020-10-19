import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, createStyles, makeStyles, Theme } from '@material-ui/core/';
import { NoResults } from './NoResults';
import { activePage } from '../../apollo_client';
import { ResultsActions } from './ResultsActions';
import { TestResultsTable } from './TestResultsTable';
import { KindergartenModal } from './KindergartenModals/KindergartenModal';
import { ChangesHistoryModal } from './KindergartenModals/ChangesHistoryModal';
import { KindergartenDeleteModal } from './KindergartenModals/KindergartenDeleteModal';
import { useKindergartens } from '../../operations/queries/Kindergartens/getKindergartens';
import { useCreateKindergarten } from '../../operations/mutations/Kindergartens/createKindergarten';
import { useDeleteKindergarten } from '../../operations/mutations/Kindergartens/deleteKindergarten';
import { useUpdateKindergarten } from '../../operations/mutations/Kindergartens/updateKindergarten';
import { Kindergarten } from '../../graphql/types';

export const TestResultsPage = () => {
    const { t } = useTranslation();
    const classes = useStyles();

    const { createKindergarten } = useCreateKindergarten();
    const { deleteKindergarten } = useDeleteKindergarten();
    const { updateKindergarten } = useUpdateKindergarten();
    const { kindergartenList } = useKindergartens();

    const [isKindergartenModalOpen, setKindergartenModalOpen] = useState(false);
    const [isChangesHistoryModalOpen, setChangesHistoryModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const [currentKindergarten, setCurrentKindergarten] = useState<Kindergarten | null>(null);

    useEffect(() => {
        activePage(['admin-menu.results']);
    }, []);

    if (!kindergartenList) return <NoResults />;

    return (
        <div className={classes.container}>
            <Typography variant="h3">{t('test-results.description')}</Typography>
            <ResultsActions
                setKindergartenModalOpen={setKindergartenModalOpen}
                setChangesHistoryModalOpen={setChangesHistoryModalOpen}
            />
            <TestResultsTable
                kindergartens={kindergartenList}
                setCurrentKindergarten={setCurrentKindergarten}
                setKindergartenModalOpen={setKindergartenModalOpen}
            />
            <KindergartenModal
                isOpen={isKindergartenModalOpen}
                onClose={() => setKindergartenModalOpen(false)}
                onAdd={createKindergarten}
                onUpdate={updateKindergarten}
                currentKindergarten={currentKindergarten}
                clearCurrentKindergarten={() => setCurrentKindergarten(null)}
                onDelete={() => setDeleteModalOpen(true)}
            />
            <ChangesHistoryModal isOpen={isChangesHistoryModalOpen} onClose={() => setChangesHistoryModalOpen(false)} />
            {currentKindergarten && (
                <KindergartenDeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setDeleteModalOpen(false)}
                    onDelete={deleteKindergarten}
                    kindergarten={currentKindergarten}
                    clearCurrentKindergarten={() => setCurrentKindergarten(null)}
                />
            )}
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: theme.spacing(3),
            display: 'flex',
            flexDirection: 'column',
            gap: `${theme.spacing(4)}px`, // for some reason it doesn't work without 'px',
        },
    }),
);
