import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { ButtonSecondary } from '../../../components/Button';
import { Article } from '../../../graphql/types';
import { useUpdateArticle } from '../../../operations/mutations/Articles/updateArticle';

export function ActionButtons(props: { value: Article; onPreviewClick: () => void; isPreview?: boolean }) {
    const T_PREFIX = 'add-article.action-buttons';
    const { t } = useTranslation();
    const history = useHistory();
    const { updateArticle } = useUpdateArticle();

    return (
        <Grid container justifyContent="space-between">
            <Grid item>
                <ButtonSecondary
                    variant="text"
                    innerText={props.isPreview ? t(`${T_PREFIX}.edit`) : t(`${T_PREFIX}.preview`)}
                    onClick={props.onPreviewClick}
                />
            </Grid>
            <Grid item>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonSecondary
                            variant="text"
                            innerText={t(`${T_PREFIX}.back`)}
                            onClick={() => history.push('/admin/articles')}
                        />
                    </Grid>
                    <Grid item>
                        <ButtonSecondary
                            variant="contained"
                            innerText={t(`${T_PREFIX}.update`)}
                            onClick={() => updateArticle(props.value)}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
