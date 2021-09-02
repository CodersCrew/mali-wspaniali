import { Link } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';

export function LegalNotesPanel() {
    const { t } = useTranslation();

    return (
        <>
            <Link href="/docs/regulamin_pl.pdf" target="_blank">
                {t('parent-settings.terms-conditions')}
            </Link>
            &nbsp;&nbsp;
            <Link href="/docs/polityka_prywatnosci_pl.pdf" target="_blank">
                {t('parent-settings.privacy-policy')}
            </Link>
        </>
    );
}
