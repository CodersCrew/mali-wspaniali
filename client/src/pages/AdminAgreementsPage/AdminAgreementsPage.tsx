import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Modal, Container, Typography, List, ListSubheader } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { ButtonSecondary } from '../../components/Button';
import { AgreementListItem } from './AgreementListItem';
import { Aggrement } from '../../graphql/types';
import { getAggrements } from '../../graphql/agreementRepository';

export const AdminAgreementsPage = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [isModalOpen, setOpenModal] = useState(false);
    const [aggrements, setAggrements] = useState<Aggrement[]>([]);

    useEffect(() => {
        getAggrements().then(({ data }) => setAggrements(data!.aggrements));
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
            {aggrements.length > 0 ? (
                <>
                    <Container>
                        <Typography variant="h4">{t('admin-agreements-page.agreements-list')}</Typography>
                        <Container>
                            <List
                                subheader={<ListSubheader>{t('admin-agreements-page.agreements-all')}</ListSubheader>}
                            >
                                {aggrements.map(agreement => (
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
                        <Modal
                            aria-labelledby="modal-title"
                            aria-describedby="modal-description"
                            open={isModalOpen}
                            onClose={handleCloseModal}
                        >
                            <div className={classes.paper}>aggrements</div>
                        </Modal>
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
