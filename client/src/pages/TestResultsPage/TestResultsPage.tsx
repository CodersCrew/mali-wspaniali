import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, createStyles, makeStyles, Theme } from '@material-ui/core/';
import { useMutation, useQuery } from '@apollo/client';
import { NoResults } from './NoResults';
import { activePage } from '../../apollo_client';
import {
    CREATE_KINDERGARTEN,
    AddKindergartenInput,
    KINDERGARTENS,
    KindergartenResponse,
    UPDATE_KINDERGARTEN,
    DELETE_KINDERGARTEN,
} from '../../graphql/kindergartensRepository';
import { ResultsActions } from './ResultsActions';
import { TestResultsTable } from './TestResultsTable';
import { KindergartenModal } from './KindergartenModals/KindergartenModal';
import { ExcelModal } from './KindergartenModals/ExcelModal';
import { ChangesHistoryModal } from './KindergartenModals/ChangesHistoryModal';

export const TestResultsPage = () => {
    const { t } = useTranslation();
    const classes = useStyles();

    const [createKindergarten] = useMutation<AddKindergartenInput>(CREATE_KINDERGARTEN);
    const [updateKindergarten] = useMutation<AddKindergartenInput>(UPDATE_KINDERGARTEN);
    const [deleteKindergarten] = useMutation<{ id: string }>(DELETE_KINDERGARTEN);
    const { data: kindergartenData } = useQuery<KindergartenResponse>(KINDERGARTENS);

    const [isKindergartenModalOpen, setKindergartenModalOpen] = useState(false);
    const [isExcelModalOpen, setExcelModalOpen] = useState(false);
    const [isChangesHistoryModalOpen, setChangesHistoryModalOpen] = useState(false);

    useEffect(() => {
        activePage(['admin-menu.results']);
        console.log(kindergartenData);
        console.log(updateKindergarten);
        console.log(deleteKindergarten);
    }, [kindergartenData]);

    const handleAddKindergarten = (value: AddKindergartenInput) =>
        createKindergarten({ variables: { kindergarten: value } });

    if (!kindergartenData) return <NoResults />;

    const { kindergartens } = kindergartenData;

    return (
        <div className={classes.container}>
            <Typography variant="h3">{t('test-results.description')}</Typography>
            <ResultsActions
                setKindergartenModalOpen={setKindergartenModalOpen}
                setExcelModalOpen={setExcelModalOpen}
                setChangesHistoryModalOpen={setChangesHistoryModalOpen}
            />
            <TestResultsTable kindergartens={kindergartens} />
            <KindergartenModal
                isOpen={isKindergartenModalOpen}
                setIsOpen={setKindergartenModalOpen}
                onSubmit={handleAddKindergarten}
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
