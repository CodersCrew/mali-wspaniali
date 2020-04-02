import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import { getDatabaseBackup } from '../../queries/httpQueries';
import { setFileName } from './utils';
import { load } from '../../utils/load';

export const DatabaseBackupButton = () => {
  // Temporary solution until admin page is up
  const isProd = false;

  const { t } = useTranslation();

  const getBackup = () => {
    load(
      getDatabaseBackup().then(response => {
        const json = JSON.stringify(response);
        const blob = new Blob([json], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = setFileName();
        a.click();
      }),
    );
  };

  if (isProd)
    return (
      <Button variant="contained" color="primary" onClick={getBackup}>
        {t('database-backup.get-backup-json')}
      </Button>
    );
  return null;
};
