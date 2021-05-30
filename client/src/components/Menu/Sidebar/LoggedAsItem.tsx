import { ListItem, ListItemText, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

interface Props {
    name: string;
}

export function LoggedAsItem({ name }: Props) {
    const { t } = useTranslation();

    return (
        <ListItem key={name}>
            <ListItemText
                disableTypography
                primary={<Typography variant="subtitle1">{t('menu.logged-as')}</Typography>}
                secondary={<Typography variant="h4">{name}</Typography>}
            />
        </ListItem>
    );
}
