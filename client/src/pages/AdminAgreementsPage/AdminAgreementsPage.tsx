import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Typography, List, ListSubheader } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { ButtonSecondary } from '../../components/Button';
import { AgreementListItem } from './AgreementListItem';
import { Agreement } from '../../graphql/types';
import { getAgreements } from '../../graphql/agreementRepository';
import { BasicModal } from '../../components/Modal/BasicModal';
import { activePage } from '../../apollo_client';

export const AdminAgreementsPage = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [isModalOpen, setOpenModal] = useState(false);
    const [agreements, setAgreements] = useState<Agreement[]>([]);

    useEffect(() => {
        activePage(['admin-menu.agreements']);
        getAgreements().then(({ data }) => setAgreements(data!.agreements));
    }, []);

    const handleOpenModal = () => {
        // if (checked.length === 1) setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <>
            <Link to="/">{t('go-to-home-page')}</Link>
            {agreements.length > 0 ? (
                <>
                    <Container>
                        <Typography variant="h4">{t('admin-agreements-page.agreements-list')}</Typography>
                        <Container>
                            <List
                                subheader={<ListSubheader>{t('admin-agreements-page.agreements-all')}</ListSubheader>}
                            >
                                {agreements.map(agreement => (
                                    <AgreementListItem key={agreement._id} agreement={agreement} />
                                ))}
                            </List>
                        </Container>
                        <Container>
                            <ButtonSecondary
                                variant="contained"
                                onClick={handleOpenModal}
                                innerText={t('admin-agreements-page.show')}
                            />
                        </Container>
                        <BasicModal isOpen={isModalOpen} onClose={handleCloseModal}>
                            <div className={classes.paper}>aggreements</div>
                        </BasicModal>
                    </Container>
                </>
            ) : (
                <EmptyResults />
            )}
        </>
    );
};

function EmptyResults() {
    const { t } = useTranslation();

    return (
        <>
            <Container>
                <Typography variant="h4">{t('admin-agreements-page.agreements-list')}</Typography>
                <Typography variant="body1">{t('no-results')}</Typography>
            </Container>
        </>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);
