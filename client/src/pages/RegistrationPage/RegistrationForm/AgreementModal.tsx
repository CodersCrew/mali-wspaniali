import { makeStyles, createStyles } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import { AgreementModalProps } from './types';
import { BasicModal } from '../../../components/Modal/BasicModal';

const T_PREFIX = 'registration-page.agreements';

export const AgreementModal = ({ open, toggleModal }: AgreementModalProps) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const body = (
        <div>
            <h3 className={classes.agreementHeader}>{t(`${T_PREFIX}.main-title`)}</h3>
            <p>
                <b>{t(`${T_PREFIX}.clausule-header`)}</b>
            </p>
            <span>{t(`${T_PREFIX}.clausule`)}</span>
        </div>
    );

    return (
        <BasicModal isOpen={open} onClose={toggleModal} onAction={toggleModal} actionName={t('close')}>
            {body}
        </BasicModal>
    );
};

export const useStyles = makeStyles(() =>
    createStyles({
        agreementHeader: {
            fontSize: 21,
            fontWeight: 'normal',
        },
    }),
);
