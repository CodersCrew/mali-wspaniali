import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAgreements } from '../../queries/agreementQueries';
import { load } from '../../utils/load';
import { Agreements } from '../../firebase/types';
import { useAuthorization } from '../../hooks/useAuthorization';

import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ListSubheader from '@material-ui/core/ListSubheader';

function getModalStyle() {
    return {
        top: `auto`,
        left: `auto`,
    };
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


export const AdminAgreementsPage = () => {
    useAuthorization(true, '/', ['admin']);
    const { t } = useTranslation();
    const classes = useStyles();
    const [agreementsList, setAgreementsList] = useState<Agreements[]>();
    const [listeners, setListeners] = useState<(() => void)[]>([]);
    const [checked, setChecked] = useState([0]);
    const [iterationVector, setIterationVector] = useState<number[]>([]);
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const createIterationVector = (count: number) => {
        let vect = new Array(count);
        for(let i = 0; i<count; i++) {
            vect[i] = i;
        }
        return vect;
    }

    const handleOpenModal = () => {
        if(checked.length === 1) setOpen(true);
    }

    const handleCloseModal = () => {
        setOpen(false);
    }

    const detachListeners = () => {
        listeners.forEach(listener => () => listener());
    };

    const waitForAgreementsData = async () => {
        const {
            agreements,
            unsubscribe,
        } = await getAgreements();
        if (unsubscribe) {  
            setAgreementsList(agreements);
            setListeners([...listeners, unsubscribe]);            
            setIterationVector(createIterationVector(agreements.length));
        };
    };

    useEffect(() => {
        load(waitForAgreementsData());
        return () => detachListeners();
      }, []);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) newChecked.push(value);
        else newChecked.splice(currentIndex, 1);
        setChecked(newChecked);
    };

    return agreementsList ? (
        <>
            <Link to="/">{t('go-to-home-page')}</Link>
            <Container>
                <Typography variant="h4">
                    {t('admin-agreements-page.agreements-list')}
                </Typography>
                <Container>
                    <List subheader={<ListSubheader>{t('admin-agreements-page.agreements-all')}</ListSubheader>}>
                        {iterationVector.map(value => {
                            const labelId = `checkbox-list-label-${value}`;
                            return (
                                <>
                                    <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={checked.indexOf(value) !== -1}
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{ "aria-labelledby": labelId }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText id={labelId} primary={`${t('admin-agreements-page.agreement')} ${agreementsList[value].title}`} />
                                        <ListItemText 
                                            id={`${labelId}req`}
                                            primary={
                                                agreementsList[value].required ? (
                                                    t('admin-agreements-page.req')
                                                ) : (
                                                    <></>
                                                )} 
                                        />
                                    </ListItem>
                                </>    
                            );
                        })}
                    </List>
                </Container>    
                {agreementsList ? <Button variant="contained" onClick={handleOpenModal}>{t('admin-agreements-page.show')}</Button> : <></>}
                {!agreementsList[checked[0]] ? (
                    <></>
                ) : (
                <Modal 
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                    open={open}
                    onClose={handleCloseModal} >
                    <div style={modalStyle} className={classes.paper}>
                        <Typography variant="h3">
                            {agreementsList[checked[0]].title}
                        </Typography>
                        <Typography variant="body1">
                            {agreementsList[checked[0]].content}
                        </Typography>
                    </div>
                </Modal>)}
            </Container>
        </>
    ) : (
        <>
            <Link to="/">{t('go-to-home-page')}</Link>
            <Container>
                <Typography variant="h4">
                    {t('admin-agreements-page.agreements-list')}
                </Typography>
                <Typography variant ="body1">
                    {t('no-results')}
                </Typography>
            </Container>
        </>
    );  
} 
