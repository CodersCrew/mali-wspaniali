import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@material-ui/core/';
import Container from '@material-ui/core/Container';
import { languages } from '../internationalization/constants';

export const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const changeLanguage = (lng: string) => {
    return i18n.changeLanguage(lng);
  };

  return (
    <Container>
      {languages.map(language => (
        <Button
          onClick={() => changeLanguage(language)}
          variant="contained"
          key={language}
        >
          {t(`languages.${language}`)}
        </Button>
      ))}
    </Container>
  );
};
