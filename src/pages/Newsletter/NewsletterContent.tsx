import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    makeStyles,
    createStyles,
    TextField,
    Chip,
    MenuItem,
    Checkbox,
    ListItemText,
    IconButton,
} from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { mainColor, newsletterColors, textColor, white } from '../../colors';
import { WorkSpace } from './Workspace';
import { openDialog } from '../../utils/openDialog';
import { HelpModal } from './HelpModal';

export const NewsletterContent: React.FC<{
    handleTypeDelete: () => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    fields: {
        type: string;
        topic: string;
        recipients: string[];
    };
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
}> = ({ handleTypeDelete, handleChange, fields, message, setMessage }) => {
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (fields.recipients.length > 0) {
            setDisabled(false);
        } else if (fields.type && fields.topic && message) {
            setDisabled(false);
        } else if (!fields.type && !fields.topic && !message) {
            setDisabled(true);
        }
    }, [fields, message]);

    const { t } = useTranslation();
    const classes = useStyles();

    const newsletterTypesArray = [
        { name: t('newsletter.newsletter-types.results'), color: newsletterColors.typeColors.yellow },
        { name: t('newsletter.newsletter-types.agreements'), color: newsletterColors.typeColors.blue },
        { name: t('newsletter.newsletter-types.events'), color: newsletterColors.typeColors.red },
        { name: t('newsletter.newsletter-types.important'), color: newsletterColors.typeColors.green },
        { name: t('newsletter.newsletter-types.other'), color: newsletterColors.typeColors.purple },
    ];

    const setMenuItems = (array: { name: string; color: string }[]) => {
        return array.map(item => {
            return (
                <MenuItem key={item.name} value={item.name} className={classes.selectMenuItem}>
                    <Checkbox
                        size={'small'}
                        checked={fields.type === item.name}
                        className={classes.selectMenuCheckbox}
                    />
                    <div className={classes.square} style={{ backgroundColor: item.color }}></div>
                    <ListItemText classes={{ primary: classes.selectMenuItemText }} primary={item.name} />
                </MenuItem>
            );
        });
    };

    const handleModalOpen = () => {
        openDialog(HelpModal, null);
    };

    return (
        <div className={disabled ? `${classes.container} ${classes.containerDisabled}` : classes.container}>
            <div className={disabled ? `${classes.heading} ${classes.headingDisabled}` : classes.heading}>
                {t('newsletter.content-heading')}
                <IconButton onClick={handleModalOpen} size={'small'} color={'inherit'} className={classes.helpButton}>
                    <HelpOutlineIcon
                        className={disabled ? `${classes.helpIcon} ${classes.helpIconDisabled}` : classes.helpIcon}
                    />
                </IconButton>
            </div>
            <TextField
                disabled={disabled}
                className={classes.textfield}
                required
                onChange={handleChange}
                name="type"
                label={t('newsletter.type-input-label')}
                // TODO: CHANGE LABEL WHEN FOCUSED
                fullWidth
                select
                SelectProps={{
                    value: fields.type,
                    MenuProps: {
                        getContentAnchorEl: null,
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'left',
                        },
                    },
                    renderValue: value => {
                        const item = newsletterTypesArray.find(element => element.name === value);
                        const itemBackgroundColor = item ? item.color :newsletterColors.typeColors.blue;
                        return (
                            <Chip
                                style={{ backgroundColor: itemBackgroundColor }}
                                classes={{
                                    label:
                                        (value as string) === t('newsletter.newsletter-types.results')
                                            ? classes.inputChipBlackLabel
                                            : classes.inputChipWhiteLabel,
                                    deleteIcon:
                                        (value as string) === t('newsletter.newsletter-types.results')
                                            ? undefined
                                            : classes.chipWhiteIcon,
                                }}
                                size={'small'}
                                label={value as string}
                                onDelete={handleTypeDelete}
                                onMouseDown={event => {
                                    event.stopPropagation();
                                }}
                            />
                        );
                    },
                }}
                InputProps={{
                    classes: {
                        focused: classes.underlineFocus,
                        underline: classes.underlineDisabled,
                    },
                }}
                InputLabelProps={{
                    classes: {
                        asterisk: classes.asterisk,
                    },
                }}
            >
                {setMenuItems(newsletterTypesArray)}
            </TextField>
            <TextField
                disabled={disabled}
                value={fields.topic}
                name="topic"
                label={t('newsletter.topic-input-label')}
                required
                onChange={handleChange}
                className={classes.textfield}
                fullWidth
                InputProps={{
                    classes: {
                        focused: classes.underlineFocus,
                        underline: classes.underlineDisabled,
                    },
                }}
                InputLabelProps={{
                    classes: {
                        asterisk: classes.asterisk,
                    },
                }}
            />
            <WorkSpace message={message} setMessage={setMessage} />
        </div>
    );
};

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            borderRadius: 4,
            boxShadow: '1px 1px 4px 0 rgba(0, 0, 0, 0.15)',
            backgroundColor: white,
            minHeight: 169,
            position: 'relative',
            marginBottom: 25,
            paddingBottom: 30,
        },
        containerDisabled: {
            opacity: 0.5,
        },
        heading: {
            backgroundColor: mainColor,
            color: white,
            fontSize: 18,
            fontWeight: 500,
            margin: '0 10px',
            padding: '8px 8px 8px 16px',
            boxShadow: '1px 1px 4px 0 rgba(0, 138, 173, 0.25)',
            borderRadius: 4,
            position: 'relative',
            top: -15,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            lineHeight: '22px',
        },
        headingDisabled: {
            backgroundColor: newsletterColors.disabledColor,
        },
        textfield: {
            maxWidth: 'calc(100% - 60px)',
            left: 30,
            marginBottom: 20,
            '& label': {
                fontSize: 15,
                lineHeight: 1.2,
                color: textColor,
                opacity: 0.42,
                '&.Mui-focused': {
                    color: mainColor,
                    opacity: 1,
                    fontSize: 12,
                },
            },
        },
        underlineFocus: {
            '&:after': {
                borderBottom: `2px solid ${mainColor}`,
            },
        },
        underlineDisabled: {
            '&.Mui-disabled:before': {
                opacity: 0.5,
                borderBottom: `2px solid ${newsletterColors.disabledColor}`,
            },
        },
        selectItem: {
            fontSize: 12,
            color: textColor,
        },
        helpIcon: {
            '&.MuiSvgIcon-root': {
                width: 21,
                height: 21,
            },
        },
        helpIconDisabled: {
            opacity: 0.5,
            color: textColor,
        },
        helpButton: {
            padding: 0,
        },
        inputChipWhiteLabel: {
            fontSize: 15,
            color: white,
        },
        inputChipBlackLabel: {
            fontSize: 15,
        },
        square: {
            width: 15,
            height: 15,
            margin: '0 4px 0 8px',
        },
        selectMenuItem: {
            padding: 0,
        },
        chipWhiteIcon: {
            color: white,
        },
        selectMenuCheckbox: {
            padding: '6px 8px',
        },
        selectMenuItemText: {
            fontSize: 12,
            color: textColor,
        },
        asterisk: {
            display: 'none',
        },
    }),
);
