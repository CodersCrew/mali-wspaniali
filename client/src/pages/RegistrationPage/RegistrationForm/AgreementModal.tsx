import React from 'react';
import { Modal } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { AgreementModalProps } from './types';

const T_PREFIX = 'registration-page.agreements';

export const AgreementModal = ({
    open,
    agreementModal,
    toggleModal,
    agreementHeader,
}: AgreementModalProps) => {
    const { t } = useTranslation();

    const body = (
        <div className={agreementModal}>
            <h3 className={agreementHeader}>{t(`${T_PREFIX}.main-title`)}</h3>
            <p>
                <b>{t(`${T_PREFIX}.clausule-header`)}</b>
            </p>
            <span>{t(`${T_PREFIX}.clausule`)}</span>
        </div>
    );

    return (
        <Modal
            open={open}
            onClose={toggleModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {body}
        </Modal>
    );
};
