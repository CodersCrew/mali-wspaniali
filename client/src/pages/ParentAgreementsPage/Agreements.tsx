import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Box,
    Card,
    createStyles,
    makeStyles,
    Theme,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Checkbox,
} from '@material-ui/core';

import { ButtonSecondary } from '../../components/Button';
import { Agreement } from '@app/graphql/types';
import { useUpdateAgreements } from '../../operations/mutations/Agreements/useUpdateAgreements';
import { PageContainer } from '../../components/PageContainer';
import { openSnackbar } from '../../components/Snackbar/openSnackbar';

interface Props {
    agreements: Agreement[];
}
export const Agreements = ({ agreements }: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { updateAgreements } = useUpdateAgreements();
    const [agreementsArray, setAgreementsArray] = useState(agreements);
    const [agreementIds, setAgreementIds] = useState<string[]>([]);

    function changeAgreement(e: ChangeEvent<HTMLInputElement>, id: string) {
        const agreementIndex = agreementsArray.findIndex((agreement) => agreement._id === id);
        const newArray = [...agreementsArray];

        newArray[agreementIndex] = { ...newArray[agreementIndex], isSigned: e.target.checked };
        setAgreementsArray([...newArray]);

        if (agreementIds.includes(id)) {
            setAgreementIds(agreementIds.filter((agreementId) => agreementId !== id));
        } else {
            setAgreementIds([...agreementIds, id]);
        }
    }

    const save = () => {
        agreementIds.forEach((agreementId) => updateAgreements({ agreementId }));
        openSnackbar({
            text: t('child-profile.agreements.snackbar-text'),
            headerText: t('child-profile.agreements.snackbar-headerText'),
        });
    };

    return (
        <PageContainer>
            <Typography variant="h3">{t('child-profile.agreements.heading')}</Typography>
            <Card className={classes.card}>
                <Typography variant="h4" className={classes.title}>
                    {t('child-profile.agreements.title')}
                </Typography>
                <Box className={classes.agreements}>
                    <List>
                        <ListItem alignItems="flex-start" className={classes.listItem}>
                            <ListItemIcon className={classes.listItemIcon}>
                                <Checkbox checked disabled />
                            </ListItemIcon>
                            <ListItemText
                                classes={{ primary: classes.primary, secondary: classes.secondary }}
                                primary={
                                    <span>
                                        <Typography variant="subtitle1">
                                            {t('child-profile.agreements.general-title')}
                                        </Typography>
                                    </span>
                                }
                                secondary={
                                    <span>
                                        <Typography variant="body1" component="span">
                                            {t('child-profile.agreements.general-description')}
                                        </Typography>
                                    </span>
                                }
                            />
                        </ListItem>
                        {agreementsArray.map((agreement) => {
                            return (
                                <ListItem alignItems="flex-start" key={agreement._id} className={classes.listItem}>
                                    <ListItemIcon className={classes.listItemIcon}>
                                        <Checkbox
                                            checked={agreement.isSigned}
                                            color="primary"
                                            onChange={(e) => changeAgreement(e, agreement._id)}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        classes={{ primary: classes.primary, secondary: classes.secondary }}
                                        primary={
                                            <span>
                                                <Typography variant="subtitle1">
                                                    {t(`child-profile.agreements.${agreement.text}-title`)}
                                                </Typography>
                                            </span>
                                        }
                                        secondary={
                                            <span>
                                                <Typography variant="body1" component="span">
                                                    {t(`child-profile.agreements.${agreement.text}-description-1`)}
                                                    <b>
                                                        {t(`child-profile.agreements.${agreement.text}-description-2`)}
                                                    </b>
                                                    {t(`child-profile.agreements.${agreement.text}-description-3`)}
                                                </Typography>
                                            </span>
                                        }
                                    />
                                </ListItem>
                            );
                        })}
                    </List>
                </Box>
                <ButtonSecondary variant="contained" className={classes.button} onClick={save}>
                    {t('child-profile.agreements.save')}
                </ButtonSecondary>
            </Card>
        </PageContainer>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        agreements: {
            padding: theme.spacing(0, 5),

            [theme.breakpoints.down('md')]: {
                padding: 0,
            },
        },
        button: {
            marginBottom: theme.spacing(2),
            marginLeft: theme.spacing(8),

            [theme.breakpoints.down('md')]: {
                marginLeft: theme.spacing(0),
            },
        },
        card: {
            padding: theme.spacing(2),
            marginTop: theme.spacing(2),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
        title: {
            marginBottom: theme.spacing(2),
        },
        listItem: {
            padding: theme.spacing(1, 0),
        },
        listItemIcon: {
            position: 'relative',
            top: -10,
            marginRight: theme.spacing(1),
        },
        primary: {
            marginBottom: theme.spacing(2),
        },
        secondary: {
            color: theme.palette.text.secondary,
        },
    }),
);
