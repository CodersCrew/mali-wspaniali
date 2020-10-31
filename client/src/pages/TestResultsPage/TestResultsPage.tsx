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

    const [kindergartenModalStatus, setKindergartenModalStatus] = useState<{
        isOpen?: boolean;
        kindergarten: Kindergarten | null;
    }>({
        kindergarten: null,
    });
    const [isChangeLogModalOpen, setChangeLogModalOpen] = useState(false);
    const [deleteModalStatus, setDeleteModalStatus] = useState<{ kindergarten: Kindergarten | null }>({
        kindergarten: null,
    });

    useEffect(() => {
        activePage(['admin-menu.results']);
    }, []);

    if (!kindergartenList) {
        return <NoResults />;
    }

    const onEditClick = (kindergarten: Kindergarten) => {
        setKindergartenModalStatus({ isOpen: true, kindergarten });
    };

    const onDelete = (id: string) => {
        deleteKindergarten(id);
        setDeleteModalStatus({ kindergarten: null });
    };

    const onKindergartenModalClose = () => {
        setKindergartenModalStatus({ kindergarten: null });
    };

    const handleAddOrEditKindergarten = (values: AddKindergartenInput) => {
        if (kindergartenModalStatus.kindergarten) {
            updateKindergarten(kindergartenModalStatus.kindergarten._id, values);
        } else {
            createKindergarten(values);
        }
        setKindergartenModalStatus({ kindergarten: null });
    };

    return (
        <div className={classes.container}>
            <Typography variant="h3">{t('test-results.description')}</Typography>
            <ResultsActions
                onAddKindergartenClick={() => setKindergartenModalStatus({ isOpen: true, kindergarten: null })}
                onChangeLogClick={() => setChangeLogModalOpen(true)}
            />
            <TestResultsTable kindergartens={kindergartenList} onEditClick={onEditClick} />
            {kindergartenModalStatus.isOpen && (
                <KindergartenModal
                    onClose={onKindergartenModalClose}
                    onSubmit={handleAddOrEditKindergarten}
                    kindergarten={kindergartenModalStatus.kindergarten}
                    onDelete={(kindergarten: Kindergarten) => {
                        setDeleteModalStatus({ kindergarten });
                    }}
                />
            )}
            <ChangeLogModal isOpen={isChangeLogModalOpen} onClose={() => setChangeLogModalOpen(false)} />
            {deleteModalStatus.kindergarten && (
                <KindergartenDeleteModal
                    onClose={() => setDeleteModalStatus({ kindergarten: null })}
                    onDelete={(id: string) => onDelete(id)}
                    kindergarten={deleteModalStatus.kindergarten}
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
