import React from 'react';
import { getDatabaseBackup, getStorageRef } from '../../queries/httpQueries';
import { getCurrentUserIdToken } from '../../queries/userQueries';
import { load } from '../../utils/load';
import { openAlertDialog } from '../AlertDialog';
import { useTranslation } from 'react-i18next';
import { ButtonPrimary } from '../../components/Button';

export const DatabaseBackupButton = () => {
    // Temporary solution until admin page is up
    const isProd = true;
    const { t } = useTranslation();

    const getBackup = () => {
        load(
            getDatabaseBackup()
                .then(async response => {
                    const { fileName } = response.data;
                    const fileRef = getStorageRef(response.data.backupUrl);
                    const [idToken, fileUrl] = await Promise.all([getCurrentUserIdToken(), fileRef.getDownloadURL()]);
                    fetch(fileUrl, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${idToken}`,
                        },
                    }).then(res => {
                        res.blob().then(blob => {
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = fileName;
                            a.click();
                        });
                    });
                })
                .catch(error => {
                    // eslint-disable-next-line no-console
                    console.log(error);
                    openAlertDialog({ type: 'error', description: error.message });
                }),
        );
    };

    if (isProd)
        return (
            <ButtonPrimary variant="contained" onClick={getBackup} innerText={t('database-backup.get-backup-json')} />
        );

    return null;
};
