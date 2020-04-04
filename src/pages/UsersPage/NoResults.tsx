import React from 'react';
import { Typography } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';

export const NoResults = () => {
  const { t } = useTranslation();

  return (
    <Typography variant="h3" align="center" gutterBottom>
      {t('no-results')}
    </Typography>
  );
};
