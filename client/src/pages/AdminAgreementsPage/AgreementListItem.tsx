import React from 'react';
import { ListItem, ListItemIcon, ListItemText, Checkbox } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Agreement } from '../../graphql/types';

interface Props {
    agreement: Agreement;
}

export function AgreementListItem({ agreement }: Props) {
    const { t } = useTranslation();

    const labelId = `checkbox-list-label-${agreement._id}`;

    return (
        <>
            <ListItem key={agreement._id} dense button>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={agreement.isSigned}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                    />
                </ListItemIcon>
                <ListItemText
                    id={labelId}
                    primary={`${t('admin-agreements-page.agreement')} ${(agreement as any).title}`}
                />
                <ListItemText
                    id={`${labelId}-req`}
                    primary={(agreement as any).required && t('admin-agreements-page.req')}
                />
            </ListItem>
        </>
    );
}
