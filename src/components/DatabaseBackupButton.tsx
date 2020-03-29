import React from 'react';
import Button from '@material-ui/core/Button';
import { getCurrentUserIdToken } from '../queries/authQueries';

export const DatabaseBackupButton = () => {
  const getBackup = async () => {
    const token = await getCurrentUserIdToken();
    console.log(token);
    if (token) {

      // TODO CHANGE URL
      fetch('http://localhost:5001/mal-wsp-dev/us-central1/default-databaseBackup', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }).then(response => {
        console.log(response);
        response.blob().then(blob => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement('a');
          a.href = url;

          //TODO ADD DATE TO NAME
          
          a.download = 'backup.json';
          a.click();
        });
        //window.location.href = response.url;
      });
    }
  };
  return (
    <Button variant="contained" color="primary" onClick={getBackup}>
      Get database
    </Button>
  );
};
