import React from 'react';
import Button from '@material-ui/core/Button';
import { getDatabaseBackup } from '../queries/httpQueries';
import { load } from '../utils/load';

export const DatabaseBackupButton = () => {
  const setFileName = () => {
    const currentDate = new Date();
    const date = `${currentDate.getDate()}-${currentDate.getMonth()}-${currentDate.getFullYear()}`;
    return `backup-${date}.json`;
  };

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

  return (
    <Button variant="contained" color="primary" onClick={getBackup}>
      Get database JSON
    </Button>
  );
};
