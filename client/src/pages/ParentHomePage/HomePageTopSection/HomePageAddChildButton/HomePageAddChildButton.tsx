import { useTranslation } from 'react-i18next';

import { HomePageAddChildCard } from './HomePageAddChildCard';

type AddChildButtonProps = {
    onClick: () => void;
};

export const HomePageAddChildButton = ({ onClick }: AddChildButtonProps) => {
    const { t } = useTranslation();

    return <HomePageAddChildCard text={t('parent-children.add-child')} onClick={onClick} />;
};
