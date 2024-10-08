import { useTranslation } from 'react-i18next';

export function useNotificationContent(): { getNotification: (name: string, values: string[]) => string } {
    const { t } = useTranslation();

    const options: { [index: string]: (values: string[]) => string } = {
        new_assessment: (values: string[]) => t('notification-list.new-assessment', { name: values[0] }),
        new_user: (values: string[]) => t('notification-list.new-user', { email: values[0] }),
        new_article: (values: string[]) => t('notification-list.new-article'),
        child_created: () => t('notification-list.child-created'),
        kindergarten_created: (values: string[]) => t('notification-list.kindergarten-created', { name: values[0] }),
    };

    return {
        getNotification: (name: string, values: string[]) => (options[name] ? options[name](values) : ''),
    };
}
