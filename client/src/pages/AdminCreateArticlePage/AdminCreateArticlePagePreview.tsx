import { useLocation, useHistory } from 'react-router-dom';
import ArticleBox from '../../components/ArticleBox/ArticleBox';
import { openConfirmCreateArticleModal } from './AdminCreateArticleModal';

const AdminCreateArticlePagePreview = () => {
    const { state }: any = useLocation();
    const history = useHistory();

    console.log('state', state);

    const onClickNextButtonTitle = () => {
        openConfirmCreateArticleModal(state?.article);
    };
    const onClickPreviousButtonTitle = () => {
        history.push('/admin/articles/create', { article: state?.article, isPreview: state.isPreview });
    };

    return (
        <ArticleBox
            article={state?.article}
            nextButtonTitle="Opublikuj"
            previousButtonTitle="Wróć"
            isPreview
            onClickNextButtonTitle={onClickNextButtonTitle}
            onClickPreviousButtonTitle={onClickPreviousButtonTitle}
        />
    );
};

export default AdminCreateArticlePagePreview;
