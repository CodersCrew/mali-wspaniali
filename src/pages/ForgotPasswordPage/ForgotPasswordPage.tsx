import React, { useState, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { TextField, Button, makeStyles, Typography } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles';


import { theme } from '../../theme';
import { backgroundColor, secondaryColor, gray } from '../../colors';
import DefaultImage from '../../assets/forgotPassword/forgot-password-default.png';
import ErrorImage from '../../assets/forgotPassword/forgot-password-error.png';
import SuccessImage from '../../assets/forgotPassword/forgot-password-success.png';


enum ImageState {
  default = "DEFAULT",
  error = "ERROR",
  success = "SUCCESS"
}

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [imageState, setImageState] = useState<ImageState>(ImageState.default);

  console.log(imageState)

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {

    setImageState(ImageState.success)
    setEmail(event.target.value)
  }

  const imageSrc = (imageState: ImageState) => {
    let source: string;
    switch (imageState) {
      case ImageState.error:
        source = ErrorImage
        break;
      case ImageState.success:
        source = SuccessImage
        break;
      default:
        source = DefaultImage
    }
    return source
  }

  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.container}>
        <div className={classes.layout}>
          <div className={classes.imageWrapper}>
            <img className={classes.image} src={imageSrc(imageState)} alt="małgosia czy jak jej tam" />
          </div>
          <Typography variant="h3" className={classes.title}>
            {t('forgot-password-page.forgot-password')}
          </Typography>
          <Typography variant="body1">
            {t('forgot-password-page.its-ok')}
          </Typography>
          <Typography variant="body1" className={classes.subtitle}>
            {t('forgot-password-page.receive-link')}
          </Typography>
          <TextField
            required
            value={email}
            id="email"
            label={t('e-mail')}
            variant="outlined"
            className={classes.textField}
            helperText={t('login-page.e-mail-helper-text')}
            onChange={handleInputChange}
          />
          <div className={classes.buttonWrapper}>
            <Button
              type="submit"
              variant="contained"
              disabled={!email}
              color="secondary"
              className={classes.button}
            >
              {t('forgot-password-page.new-password')}
            </Button>
          </div>

        </div>

      </div>
    </ThemeProvider>
  );
};

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
  },
  layout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    minHeight: '90vh',

    '@media (max-width:767px)': {
      minHeight: 'auto',
      width: '100%',
      margin: '0 15px',
    },
  },
  title: {
    marginBottom: '25px',
    textTransform: 'uppercase',

    '@media (max-width:767px)': {
      marginTop: '40px',
    },
  },
  subtitle: {
    textAlign: 'center',
    width: '320px',
    marginBottom: '20px'
  },
  buttonWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end'
  },
  button: {
    color: backgroundColor,
    fontWeight: 'bold',
    marginTop: '20px',

    '&disbled': {
      color: secondaryColor,
    }
  },
  textField: {
    width: '100%'
  },
  imageWrapper: {
    height: '224px',
    width: '224px',
    borderRadius: "50%",
    backgroundColor: gray,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px'
  },
  image: {
    width: '214px',
  }
})
