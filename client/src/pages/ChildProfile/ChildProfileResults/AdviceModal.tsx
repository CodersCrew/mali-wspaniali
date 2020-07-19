import React from 'react';
import { DialogContent, DialogTitle, DialogActions } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/Button';

interface Props {
    content: string;
    closeModal: () => void;
}

export const AdviceModal = ({ content, closeModal }: Props) => {
    const { t } = useTranslation();

    return (
        <>
            <DialogTitle>
                {t('child-profile.advice')}
            </DialogTitle>
            <DialogContent>{content}</DialogContent>
            <DialogActions>
                <Button color="primary" onClick={closeModal} innerText="close" />
            </DialogActions>
        </>
    );
};
