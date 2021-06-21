import { useLocation, useHistory } from 'react-router-dom';

import ArticleBox from '../../components/ArticleBox/ArticleBox';
import { openConfirmCreateArticleModal } from './AdminCreateArticleModal';

const mandatoryObject = (object: any) => {
    const obligatoryArticleField = object;

    delete obligatoryArticleField.category;
    delete obligatoryArticleField.videoUrl;
    delete obligatoryArticleField.redactor.avatarUrl;
    delete obligatoryArticleField.redactor.biography;

    return obligatoryArticleField;
};

const AdminCreateArticlePagePreview = () => {
    const { state }: any = useLocation();
    const history = useHistory();

    const obligatoryArticleFieldTest = mandatoryObject(state.article);

    const articleWithValidation = { ...state?.article, isValid: isValid(obligatoryArticleFieldTest) };

    function isValid(item: any) {
        let currentValue: Array<boolean> = [];
        Object?.keys(item)?.forEach((key) => {
            if (typeof item[key] === 'object') {
                isValid(item[key]);
            }
            if (item[key] === '') currentValue = [...currentValue, false];
        });

        console.log('currentValue', currentValue);

        return !currentValue.includes(false);
    }

    const onClickNextButtonTitle = () => {
        openConfirmCreateArticleModal(articleWithValidation);
    };
    const onClickPreviousButtonTitle = () => {
        console.log('TEST');
        history.push('/admin/articles/create', { article: state?.article, isPreview: state?.isPreview });
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
