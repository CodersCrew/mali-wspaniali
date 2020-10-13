import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, createStyles, makeStyles, Theme } from '@material-ui/core/';
import { NoResults } from './NoResults';
import { activePage } from '../../apollo_client';
import { ResultsActions } from './ResultsActions';
import { TestResultsTable } from './TestResultsTable';
import { KindergartenModal } from './KindergartenModals/KindergartenModal';
import { ExcelModal } from './KindergartenModals/ExcelModal';
import { ChangesHistoryModal } from './KindergartenModals/ChangesHistoryModal';
import { AddKindergartenInput } from '../../graphql/kindergartensRepository';
import { useKindergartens } from '../../operations/queries/Kindergartens/getKindergartens';
import { useCreateKindergarten } from '../../operations/mutations/Kindergartens/createKindergarten';
import { useDeleteKindergarten } from '../../operations/mutations/Kindergartens/deleteKindergarten';
import { useUpdateKindergarten } from '../../operations/mutations/Kindergartens/updateKindergarten';
import { Kindergarten } from '../../graphql/types';
import { openSnackbar } from '../../components/Snackbar/openSnackbar';

export const TestResultsPage = () => {
    const { t } = useTranslation();
    const classes = useStyles();

    const { createKindergarten } = useCreateKindergarten();
    const { deleteKindergarten } = useDeleteKindergarten();
    const { updateKindergarten } = useUpdateKindergarten();
    const { kindergartenList } = useKindergartens();

    const [isKindergartenModalOpen, setKindergartenModalOpen] = useState(false);
    const [isExcelModalOpen, setExcelModalOpen] = useState(false);
    const [isChangesHistoryModalOpen, setChangesHistoryModalOpen] = useState(false);
    const [currentKindergarten, setCurrentKindergarten] = useState<Kindergarten | null>(null);

    useEffect(() => {
        activePage(['admin-menu.results']);
    }, []);

    const handleAddKindergarten = async (kindergarten: AddKindergartenInput) => {
        try {
            await createKindergarten({ variables: { kindergarten } });
            openSnackbar({ text: t('test-results.add-kindergarten-success') });
        } catch (error) {
            openSnackbar({ text: error.message, severity: 'error' });
        }
    };

    const handleUpdateKindergarten = async (id: string, kindergarten: AddKindergartenInput) => {
        try {
            await updateKindergarten({
                variables: {
                    id,
                    kindergarten,
                },
            });
            openSnackbar({ text: t('test-results.update-kindergarten-success') });
        } catch (error) {
            openSnackbar({ text: error.message, severity: 'error' });
        }
    };

    const handleDeleteKindergarten = async (id: string) => {
        try {
            await deleteKindergarten({
                variables: { id },
                update: cache => {
                    cache.modify({
                        fields: {
                            kindergartens(existingKindergartenRefs: { __ref: string }[], { readField }) {
                                return existingKindergartenRefs.filter(
                                    kindergartenRef => id !== readField('_id', kindergartenRef),
                                );
                            },
                        },
                    });
                },
            });
            openSnackbar({ text: t('test-results.delete-kindergarten-success') });
        } catch (error) {
            openSnackbar({ text: t('test-results.delete-kindergarten-fail'), severity: 'error' });
        }
    };

    if (!kindergartenList) return <NoResults />;

    return (
        <div className={classes.container}>
            <Typography variant="h3">{t('test-results.description')}</Typography>
            <ResultsActions
                setKindergartenModalOpen={setKindergartenModalOpen}
                setExcelModalOpen={setExcelModalOpen}
                setChangesHistoryModalOpen={setChangesHistoryModalOpen}
            />
            <TestResultsTable
                kindergartens={kindergartenList}
                setCurrentKindergarten={setCurrentKindergarten}
                setKindergartenModalOpen={setKindergartenModalOpen}
            />
            <KindergartenModal
                isOpen={isKindergartenModalOpen}
                setIsOpen={setKindergartenModalOpen}
                onAdd={handleAddKindergarten}
                onUpdate={handleUpdateKindergarten}
                initialData={
                    currentKindergarten && {
                        number: currentKindergarten.number,
                        name: currentKindergarten.name,
                        address: currentKindergarten.address,
                        city: currentKindergarten.city,
                    }
                }
                kindergartenId={currentKindergarten && currentKindergarten._id}
                setCurrentKindergarten={setCurrentKindergarten}
                onDelete={handleDeleteKindergarten}
            />
            <ExcelModal isOpen={isExcelModalOpen} setIsOpen={setExcelModalOpen} />
            <ChangesHistoryModal isOpen={isChangesHistoryModalOpen} setIsOpen={setChangesHistoryModalOpen} />
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
