import React, { useState, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { TextField, Button, makeStyles, Typography } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles';


import { theme } from '../../theme';
import { backgroundColor, secondaryColor } from '../../colors';
import DefaultImage from '../../assets/forgotPassword/default.png';
import ErrorImage from '../../assets/forgotPassword/error.png';
import SuccessImage from '../../assets/forgotPassword/success.png';


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
          <img className={classes.image} src={imageSrc(imageState)} alt="małgosia czy jak jej tam" />
          <Typography variant="h3" className={classes.title}>
            {t('forgot-password-page.forgot-password')}
          </Typography>
          <Typography variant="body1" className={classes.subtitle}>
            {t('forgot-password-page.its-ok')}
          </Typography>
          <Typography variant="body1" className={`${classes.subtitle} ${classes.subtitleThin}`}>
            {t('forgot-password-page.receive-link')}
          </Typography>
          <TextField
            required
            value={email}
            id="email"
            label={t('e-mail')}
            variant="outlined"
            className={classes.textField}
            helperText={t('forgot-password-page.email-helper-text')}
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
          <div className={classes.underlined}>
            <Typography variant="caption">
              {t('forgot-password-page.problem')}
            </Typography>
            <Typography variant="caption">
              {t('forgot-password-page.contact')}
            </Typography>
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

    [theme.breakpoints.down('sm')]: {
      minHeight: 'auto',
      width: '100%',
      maxWidth: '480px',
      margin: '0 15px',
    },
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    marginTop: '20px',
    textTransform: 'uppercase',
  },
  subtitle: {
    textAlign: 'center',
  },
  subtitleThin: {
    marginBottom: '20px',
    width: '320px',
  },
  buttonWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end'
  },
  button: {
    color: backgroundColor,
    fontWeight: 'bold',
    marginBottom: '20px',
    marginTop: '20px',

    [theme.breakpoints.down('sm')]: {
      marginBottom: '44px',
      marginTop: '30px',
    },

    '&disbled': {
      color: secondaryColor,
    }
  },
  textField: {
    width: '100%'
  },
  image: {
    borderRadius: '50%',
    width: '214px',
    [theme.breakpoints.down('sm')]: {
      width: '100px',
      marginTop: '40px'
    }
  },
  underlined: {
    textAlign: 'center',
    position: 'relative',
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',

    '&::after': {
      position: 'absolute',
      content: '""',
      height: '1px',
      margin: '0 auto',
      left: '0',
      bottom: '-2px',
      right: '0',
      width: '100%',
      background: 'black',
    }
  }
})
