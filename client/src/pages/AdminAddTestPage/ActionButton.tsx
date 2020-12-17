import React from 'react';
import { useTranslation } from 'react-i18next';

import { ButtonSecondary } from '../../components/Button';
import { ArrowTooltip } from '../../components/Tooltip/ArrowTooltip';

interface Props {
    name: string;
    onClick: () => void;
    reasonForBeingDisabled?: string;
}

export function ActionButton({ name, onClick, reasonForBeingDisabled }: Props) {
    const { t } = useTranslation();

    const button = (
        <ButtonSecondary
            variant="contained"
            data-testid="create-button"
            onClick={onClick}
            disabled={!!reasonForBeingDisabled}
        >
            {name}
        </ButtonSecondary>
    );

    if (reasonForBeingDisabled) {
        const translatedDisableReason = t(reasonForBeingDisabled);

        return (
            <ArrowTooltip title={translatedDisableReason} role="tooltip">
                <span>{button}</span>
            </ArrowTooltip>
        );
    }

    return button;
}
