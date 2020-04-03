import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAgreements } from '../../queries/agreementQueries';
import { load } from '../../utils/load';
import { AdminAgreement } from '../../firebase/types';
import { useAuthorization } from '../../hooks/useAuthorization';
import {
  Modal,
  Button,
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
  const [agreementsList, setAgreementsList] = useState<AdminAgreement[]>();
  const [listeners, setListeners] = useState<(() => void)[]>([]);
  const [checked, setChecked] = useState<string[]>([]);
  const [isModalOpen, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    if (checked.length === 1) setOpenModal(true);
  };
  
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

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const detachListeners = () => {
    listeners.forEach(listener => () => listener());
  };

  const waitForAgreementsData = async () => {
    const { agreement, unsubscribe } = await getAgreements();
    if (unsubscribe) {
      setAgreementsList(agreement);
      setListeners([...listeners, unsubscribe]);
    }
  };

  useEffect(() => {
    load(waitForAgreementsData());
    return () => detachListeners(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggle = (id: string) => () => {
    if (checked.includes(id))
      setChecked(checked.filter(checkedId => checkedId !== id));
    else setChecked([...checked, id]);
  };

  return (
    <>
      <Link to="/">{t('go-to-home-page')}</Link>
      {agreementsList ? (
        <>
          <Container>
            <Typography variant="h4">
              {t('admin-agreements-page.agreements-list')}
            </Typography>
            <Container>
              <List
                subheader={
                  <ListSubheader>
                    {t('admin-agreements-page.agreements-all')}
                  </ListSubheader>
                }
              >
                {agreementsList.map(agreement => {
                  const labelId = `checkbox-list-label-${agreement.agreementId}`;
                  return (
                    <>
                      <ListItem
                        key={agreement.agreementId}
                        dense
                        button
                        onClick={handleToggle(agreement.agreementId)}
                      >
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={checked.includes(agreement.agreementId)}
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
                          primary={
                            agreement.required && t('admin-agreements-page.req')
                          }
                        />
                      </ListItem>
                    </>
                  );
                })}
              </List>
            </Container>
            <Container>
              <Button variant="contained" onClick={handleOpenModal}>
                {t('admin-agreements-page.show')}
              </Button>
            </Container>
            <Modal
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
              open={isModalOpen}
              onClose={handleCloseModal}
            >
              <div style={modalStyle} className={classes.paper}>
                <Typography variant="h3">
                  {
                    (
                      agreementsList.find(
                        agreement => agreement.agreementId === checked[0],
                      ) || {}
                    ).title
                  }
                </Typography>
                <Typography variant="body1">
                  {
                    (
                      agreementsList.find(
                        agreement => agreement.agreementId === checked[0],
                      ) || {}
                    ).content
                  }
                </Typography>
              </div>
            </Modal>
          </Container>
        </>
      ) : (
        <>
          <Container>
            <Typography variant="h4">
              {t('admin-agreements-page.agreements-list')}
            </Typography>
            <Typography variant="body1">{t('no-results')}</Typography>
          </Container>
        </>
      )}
    </>
  );
};
