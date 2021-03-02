import { TextField } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import { RegistrationEmailProps } from './types';
import { emailTest } from '../emailTest';
import { ButtonSecondary } from '../../../components/Button';

export const RegistrationEmail = ({
    handleChange,
    handleNext,
    handleBack,
    email,
    classForm,
    classButton,
    classNextBtn,
}: RegistrationEmailProps) => {
    const { t } = useTranslation();

    return (
        <>
            <TextField
                required
                onChange={handleChange}
                value={email}
                id="email"
                type="email"
                label={t('e-mail')}
                variant="outlined"
                inputProps={{ 'data-testid': 'email' }}
                className={classForm}
                helperText={t('login-page.e-mail-helper-text')}
            />
            <div className={classButton}>
                <ButtonSecondary variant="text" onClick={handleBack} innerText={t('back')} />
                <ButtonSecondary
                    variant="contained"
                    onClick={handleNext}
                    className={classNextBtn}
                    disabled={!emailTest(email)}
                    innerText={t('next')}
                />
            </div>
        </>
    );
};
