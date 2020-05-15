import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, Theme, createStyles, TextField, Chip, MenuItem, Checkbox, ListItemText } from '@material-ui/core';
import { mainColor } from '../../colors';
import { WorkSpace } from './Workspace';

const newsletterTypesArray = ['Wyniki pomiarów', 'Zgody', 'Wydarzenia', 'Ważne', 'Inne'];
export const NewsletterContent: React.FC<{
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    fields: {
        type: string;
        topic: string;
        recipients: string[];
    };
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
}> = ({ handleChange, fields, message, setMessage }) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const setMenuItems = (array: string[]) => {
        return array.map(item => (
            <MenuItem key={item} value={item}>
                <Checkbox checked={fields.type === item} />
                <ListItemText primary={item} />
            </MenuItem>
        ));
    };

    const handleDelete = (value: string) => {
        console.log('remove', value);
    };

    return (
        <div className={classes.container}>
            <div className={classes.heading}>{t('newsletter.content-heading')}</div>
            <TextField
                className={classes.textfield}
                required
                onChange={handleChange}
                name="type"
                label={'Wybierz rodzaj'}
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
                        return (
                            <Chip
                                label={value as string}
                                onDelete={() => handleDelete(value as string)}
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
                    },
                }}
            >
                {setMenuItems(newsletterTypesArray)}
            </TextField>
            <TextField
                name="title"
                label="Wpisz temat"
                required
                onChange={handleChange}
                className={classes.textfield}
                fullWidth
                InputProps={{
                    classes: {
                        focused: classes.underlineFocus,
                    },
                }}
            />
            <WorkSpace message={message} setMessage={setMessage} />
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            borderRadius: 4,
            boxShadow: '1px 1px 4px 0 rgba(0, 0, 0, 0.15)',
            backgroundColor: '#ffffff',
            minHeight: 169,
            position: 'relative',
        },
        heading: {
            backgroundColor: mainColor,
            color: '#ffffff',
            fontSize: 18,
            fontWeight: 500,
            margin: '0 10px',
            padding: '8px 0 8px 16px',
            boxShadow: '1px 1px 4px 0 rgba(0, 138, 173, 0.25)',
            borderRadius: 4,
            position: 'relative',
            top: -15,
        },
        textfield: {
            maxWidth: 'calc(100% - 60px)',
            left: 30,
            marginBottom: 20,
            '& label': {
                fontSize: 15,
                lineHeight: 1.2,
                color: '#1d1d1b',
                opacity: 0.42,
                '&.Mui-focused': {
                    color: '#008aad',
                    opacity: 1,
                    fontSize: 12,
                },
            },
            '& .MuiFormLabel-asterisk': {
                display: 'none',
            },
        },
        underlineFocus: {
            '&:after': {
                borderBottom: '2px solid #008aad',
            },
        },
        selectItem: {
            fontSize: 12,
            color: '1d1d1b',
        },
    }),
);
