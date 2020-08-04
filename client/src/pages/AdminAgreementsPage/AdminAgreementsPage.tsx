import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    Modal,
    Container,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Checkbox,
    ListSubheader,
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { getAgreements } from '../../queries/agreementQueries';
import { Agreement } from '../../firebase/types';
import { useAuthorization } from '../../hooks/useAuthorization';
import { useSubscribed } from '../../hooks/useSubscribed';
import { OnSnapshotCallback } from '../../firebase/userRepository';
import { ButtonSecondary } from '../../components/Button';

export const AdminAgreementsPage = () => {
    useAuthorization(true, '/', ['admin']);
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
    const classes = useStyles();
    const { t } = useTranslation();
    const [checked, setChecked] = useState<string[]>([]);
    const [isModalOpen, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        if (checked.length === 1) setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const agreements = useSubscribed<Agreement[] | null, string>(
        (callback: OnSnapshotCallback<Agreement[]>) => getAgreements(callback),
        [],
    ) as Agreement[];

    const handleToggle = (id: string) => () => {
        if (checked.includes(id)) setChecked(checked.filter(checkedId => checkedId !== id));
        else setChecked([...checked, id]);
    };

    return (
        <>
            <Link to="/">{t('go-to-home-page')}</Link>
            {agreements ? (
                <>
                    <Container>
                        <Typography variant="h4">{t('admin-agreements-page.agreements-list')}</Typography>
                        <Container>
                            <List
                                subheader={<ListSubheader>{t('admin-agreements-page.agreements-all')}</ListSubheader>}
                            >
                                {agreements.map(agreement => {
                                    const labelId = `checkbox-list-label-${agreement.id}`;

                                    return (
                                        <>
                                            <ListItem
                                                key={agreement.id}
                                                dense
                                                button
                                                onClick={handleToggle(agreement.id)}
                                            >
                                                <ListItemIcon>
                                                    <Checkbox
                                                        edge="start"
                                                        checked={checked.includes(agreement.id)}
                                                        tabIndex={-1}
                                                        disableRipple
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText
                                                    id={labelId}
                                                    primary={`${t('admin-agreements-page.agreement')} ${
                                                        agreement.title
                                                    }`}
                                                />
                                                <ListItemText
                                                    id={`${labelId}-req`}
                                                    primary={agreement.required && t('admin-agreements-page.req')}
                                                />
                                            </ListItem>
                                        </>
                                    );
                                })}
                            </List>
                        </Container>
                        <Container>
                            <ButtonSecondary variant="contained" onClick={handleOpenModal} innerText={t('admin-agreements-page.show')} />
                        </Container>
                        <Modal
                            aria-labelledby="modal-title"
                            aria-describedby="modal-description"
                            open={isModalOpen}
                            onClose={handleCloseModal}
                        >
                            <div className={classes.paper}>
                                <Typography variant="h3">
                                    {(agreements.find(agreement => agreement.id === checked[0]) || {}).title}
                                </Typography>
                                <Typography variant="body1">
                                    {(agreements.find(agreement => agreement.id === checked[0]) || {}).content}
                                </Typography>
                            </div>
                        </Modal>
                    </Container>
                </>
            ) : (
                <>
                    <Container>
                        <Typography variant="h4">{t('admin-agreements-page.agreements-list')}</Typography>
                        <Typography variant="body1">{t('no-results')}</Typography>
                    </Container>
                </>
            )}
        </>
    );
};
