import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, createStyles, makeStyles, Theme } from '@material-ui/core/';
import { NoResults } from './NoResults';
import { ResultsActions } from './ResultsActions';
import { TestResultsTable } from './KindergartenTable/TestResultsTable';
import { KindergartenModal } from './KindergartenModals/KindergartenModal';
import { ChangeLogModal } from './KindergartenModals/ChangeLogModal';
import { KindergartenDeleteModal } from './KindergartenModals/KindergartenDeleteModal';
import { activePage } from '../../apollo_client';
import { useKindergartens } from '../../operations/queries/Kindergartens/getKindergartens';
import { useCreateKindergarten } from '../../operations/mutations/Kindergartens/createKindergarten';
import { useDeleteKindergarten } from '../../operations/mutations/Kindergartens/deleteKindergarten';
import { useUpdateKindergarten } from '../../operations/mutations/Kindergartens/updateKindergarten';
import { Kindergarten, AddKindergartenInput } from '../../graphql/types';

export const TestResultsPage = () => {
    const { t } = useTranslation();
    const classes = useStyles();

    const { createKindergarten } = useCreateKindergarten();
    const { deleteKindergarten } = useDeleteKindergarten();
    const { updateKindergarten } = useUpdateKindergarten();
    const { kindergartenList } = useKindergartens();

    const [isKindergartenModalOpen, setKindergartenModalOpen] = useState(false);
    const [isChangeLogModalOpen, setChangeLogModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const [currentKindergarten, setCurrentKindergarten] = useState<Kindergarten | null>(null);

    useEffect(() => {
        activePage(['admin-menu.results']);
    }, []);

    if (!kindergartenList) {
        return <NoResults />;
    }

    const onEditClick = (kindergarten: Kindergarten) => {
        setCurrentKindergarten(kindergarten);
        setKindergartenModalOpen(true);
    };

    const onDelete = (id: string) => {
        deleteKindergarten(id);
        setCurrentKindergarten(null);
    };

    const onKindergartenModalClose = () => {
        setKindergartenModalOpen(false);
        setCurrentKindergarten(null);
    };

    const handleAddOrEditKindergarten = (values: AddKindergartenInput) => {
        if (currentKindergarten) {
            updateKindergarten(currentKindergarten._id, values);
        } else {
            createKindergarten(values);
        }
        setKindergartenModalOpen(false);
        setCurrentKindergarten(null);
    };

    return (
        <div className={classes.container}>
            <Typography variant="h3">{t('test-results.description')}</Typography>
            <ResultsActions
                onAddKindergartenClick={() => setKindergartenModalOpen(true)}
                onChangeLogClick={() => setChangeLogModalOpen(true)}
            />
            <TestResultsTable kindergartens={kindergartenList} onEditClick={onEditClick} />
            <KindergartenModal
                isOpen={isKindergartenModalOpen}
                onClose={onKindergartenModalClose}
                onSubmit={handleAddOrEditKindergarten}
                currentKindergarten={currentKindergarten}
                onDelete={() => setDeleteModalOpen(true)}
            />
            <ChangeLogModal isOpen={isChangeLogModalOpen} onClose={() => setChangeLogModalOpen(false)} />
            {currentKindergarten && (
                <KindergartenDeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setDeleteModalOpen(false)}
                    onDelete={onDelete}
                    kindergarten={currentKindergarten}
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
