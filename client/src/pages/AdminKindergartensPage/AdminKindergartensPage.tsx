import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Box, makeStyles, createStyles, Theme } from '@material-ui/core/';
import { NoResults } from './NoResults';
import { ResultsActions } from './ResultsActions';
import { KindergartensTable } from './KindergartensTable/KindergartensTable';
import { KindergartenModal } from './KindergartenModals/KindergartenModal';
import { KindergartenDeleteModal } from './KindergartenModals/KindergartenDeleteModal';
import { activePage } from '../../apollo_client';
import { useKindergartens } from '../../operations/queries/Kindergartens/getKindergartens';
import { useCreateKindergarten } from '../../operations/mutations/Kindergartens/createKindergarten';
import { useDeleteKindergarten } from '../../operations/mutations/Kindergartens/deleteKindergarten';
import { useUpdateKindergarten } from '../../operations/mutations/Kindergartens/updateKindergarten';
import { Kindergarten, AddKindergartenInput } from '../../graphql/types';
import { PageContainer } from '../../components/PageContainer';

export default function AdminKindergartensPage() {
    const { t } = useTranslation();
    const classes = useStyles();

    const { createKindergarten } = useCreateKindergarten();
    const { deleteKindergarten } = useDeleteKindergarten();
    const { updateKindergarten } = useUpdateKindergarten();
    const { kindergartenList } = useKindergartens();

    const [kindergartenModalStatus, setKindergartenModalStatus] = useState<{
        isOpen: boolean;
        kindergarten: Kindergarten | null;
    }>({
        isOpen: false,
        kindergarten: null,
    });
    const [deleteModalStatus, setDeleteModalStatus] = useState<{ kindergarten: Kindergarten | null }>({
        kindergarten: null,
    });

    useEffect(() => {
        activePage(['admin-menu.kindergartens.title']);
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
        setKindergartenModalStatus({ isOpen: false, kindergarten: null  });
    };

    const handleAddOrEditKindergarten = (values: AddKindergartenInput) => {
        if (kindergartenModalStatus.kindergarten) {
            updateKindergarten(kindergartenModalStatus.kindergarten._id, values);
        } else {
            createKindergarten(values);
        }
        setKindergartenModalStatus({ isOpen: false, kindergarten: null });
    };

    return (
        <PageContainer>
            <Box className={classes.wrapper}>
                <Box className={classes.header}>
                    <Typography variant="h3">{t('admin-menu.kindergartens.list')}</Typography>
                    <ResultsActions
                        onAddKindergartenClick={() => setKindergartenModalStatus({ isOpen: true, kindergarten: null })}
                    />
                </Box>
                <KindergartensTable kindergartens={kindergartenList} onEditClick={onEditClick} />
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
                {deleteModalStatus.kindergarten && (
                    <KindergartenDeleteModal
                        onClose={() => setDeleteModalStatus({ kindergarten: null })}
                        onDelete={(id: string) => onDelete(id)}
                        kindergarten={deleteModalStatus.kindergarten}
                    />
                )}
            </Box>
        </PageContainer>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            padding: theme.spacing(2),
            backgroundColor: theme.palette.primary.contrastText,
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: theme.spacing(2),
        },
    }),
);
