import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, IconButton, Card, CardHeader, CardContent, Divider, Grid } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { WorkSpace } from './Workspace';
import { openDialog } from '../../utils/openDialog';
import { HelpModal } from './HelpModal';
import { NewsletterContentProps } from './types';
import { newsletterTypes } from './data';
import { SingleSelect } from './SingleSelect';

export const NewsletterContent = ({
    handleTypeDelete,
    handleChange,
    type,
    topic,
    recipients,
    message,
    setFields,
}: NewsletterContentProps) => {
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (recipients.value.length > 0) {
            setDisabled(false);
        } else if (type.value && topic.value && message.value) {
            setDisabled(false);
        } else if (!type.value && !topic.value && !message.value) {
            setDisabled(true);
        }
    }, [recipients, type, topic, message]);

    const { t } = useTranslation();

    const handleModalOpen = () => {
        openDialog(HelpModal, null);
    };

    return (
        <Card>
            <CardHeader
                title={t('newsletter.content-heading')}
                titleTypographyProps={{ variant: 'h4' }}
                action={
                    <IconButton aria-label="info" onClick={handleModalOpen} color="primary">
                        <InfoOutlinedIcon />
                    </IconButton>
                }
            />
            <Divider />
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <SingleSelect
                            disabled={disabled}
                            stateData={type}
                            optionsValues={newsletterTypes}
                            handleChange={handleChange}
                            id="newsletter-type"
                            label={t('newsletter.help-modal.type')}
                            name="type"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            disabled={disabled}
                            value={topic.value}
                            name="topic"
                            variant="outlined"
                            label={
                                topic.value
                                    ? t('newsletter.topic-input-label-filled')
                                    : t('newsletter.topic-input-label')
                            }
                            required
                            onChange={handleChange}
                            fullWidth
                            error={topic.error}
                            helperText={topic.error ? t('newsletter.topic-helper-text') : null}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <WorkSpace message={message.value} setFields={setFields} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         container: {
//             borderRadius: 4,
//             boxShadow: '1px 1px 4px 0 rgba(0, 0, 0, 0.15)',
//             backgroundColor: white,
//             minHeight: 169,
//             position: 'relative',
//             marginBottom: 25,
//             marginTop: 100,
//             paddingBottom: 30,
//         },
//         containerDisabled: {
//             opacity: 0.5,
//         },
//         heading: {
//             backgroundColor: theme.palette.primary.main,
//             color: white,
//             fontSize: 18,
//             fontWeight: 500,
//             margin: '0 10px',
//             padding: '8px 8px 8px 16px',
//             boxShadow: '1px 1px 4px 0 rgba(0, 138, 173, 0.25)',
//             borderRadius: 4,
//             position: 'relative',
//             top: -15,
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             lineHeight: '22px',
//         },
//         headingDisabled: {
//             backgroundColor: newsletterColors.disabledColor,
//         },
//         textfield: {
//             maxWidth: 'calc(100% - 60px)',
//             left: 30,
//             marginBottom: 20,
//             '& label': {
//                 fontSize: 15,
//                 lineHeight: 1.2,
//                 color: textColor,
//                 opacity: 0.42,
//                 '&.Mui-focused': {
//                     opacity: 1,
//                     fontSize: 12,
//                 },
//                 '&.Mui-error': {
//                     color: '#f44336',
//                 },
//             },
//         },
//         underlineFocus: {
//             '&:after': {
//                 borderBottom: `2px solid ${theme.palette.primary.main}`,
//             },
//         },
//         underlineDisabled: {
//             '&.Mui-disabled:before': {
//                 opacity: 0.5,
//                 borderBottom: `2px solid ${newsletterColors.disabledColor}`,
//             },
//         },
//         selectItem: {
//             fontSize: 12,
//             color: textColor,
//         },
//         helpIcon: {
//             '&.MuiSvgIcon-root': {
//                 width: 21,
//                 height: 21,
//             },
//         },
//         helpIconDisabled: {
//             opacity: 0.5,
//             color: textColor,
//         },
//         helpButton: {
//             padding: 0,
//         },
//         inputChipWhiteLabel: {
//             fontSize: 15,
//             color: white,
//         },
//         inputChipBlackLabel: {
//             fontSize: 15,
//         },
//         square: {
//             width: 15,
//             height: 15,
//             margin: '0 4px 0 8px',
//         },
//         selectMenuItem: {
//             padding: 0,
//         },
//         chipWhiteIcon: {
//             color: white,
//         },
//         selectMenuCheckbox: {
//             padding: '6px 8px',
//         },
//         selectMenuItemText: {
//             fontSize: 12,
//             color: textColor,
//         },
//         asterisk: {
//             display: 'none',
//         },
//     }),
// );
