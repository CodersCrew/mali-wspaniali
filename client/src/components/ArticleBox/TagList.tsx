import { createStyles, makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { ButtonPrimary } from '../Button';
import { useIsDevice } from '../../queries/useBreakpoints';
import { isDisabledArticleClassVisible } from './utils';

interface Props {
    tags: string[];
    isPreview?: boolean;
}

export function TagList({ tags, isPreview }: Props) {
    const classes = useStyles();
    const { isMobile } = useIsDevice();
    const { t } = useTranslation();

    const previousTag = [1, 2, 3].map((index: number) => t(`admin-articles.tags.tag${index}`));

    const isTags = tags?.length > 0;
    const allTags = isDisabledArticleClassVisible(isPreview, isTags) ? previousTag : tags;

    return (
        <>
            {allTags?.map((tag: string, index: number) => {
                return (
                    <ButtonPrimary
                        key={`${tag} ${index}`}
                        variant="contained"
                        disableElevation
                        className={clsx({
                            [classes.contentTagsButton]: true,
                            [classes.contentTagsButtonMobile]: isMobile,
                            [classes.disabled]: !isTags,
                        })}
                        innerText={`#${tag}`}
                    />
                );
            })}
        </>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        contentTagsButton: {
            color: theme.palette.text.primary,
            borderRadius: theme.spacing(2),
            margin: theme.spacing(0, 2, 0, 0),
        },
        contentTagsButtonMobile: {
            margin: theme.spacing(2, 2, 0, 0),
        },
        disabled: {
            opacity: '0.5',
        },
    }),
);
