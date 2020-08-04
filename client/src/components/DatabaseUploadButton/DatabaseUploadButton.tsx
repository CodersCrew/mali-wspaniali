import React, { useState, SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, Input } from '@material-ui/core';
import { CloudUpload, DescriptionSharp } from '@material-ui/icons';
import { ButtonPrimary } from '../Button';

export const DatabaseUploadButton = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [file, setFile] = useState('');

    const onSelectFile = (e: SyntheticEvent<EventTarget>) => {
        e.preventDefault();
        const inputValue = (e.target as HTMLInputElement).value;
        setFile(inputValue);
    };

    return (
        <div className={classes.container}>
            <ButtonPrimary variant="contained" className={classes.button}>
                <label className={classes.label}>
                    <DescriptionSharp className={classes.icon} />
                    <span>{t('database-upload.choose-file')}</span>
                    <Input type="file" id="file" className={classes.input} onChange={onSelectFile} value={file} />
                </label>
            </ButtonPrimary>
            <div className={classes.file}>{file.replace(/^.*\\/, '')}</div>
            {Boolean(file) && (
                <ButtonPrimary variant="contained">
                    <CloudUpload className={classes.icon} />
                    <span>{t('database-upload.upload-file')}</span>
                </ButtonPrimary>
            )}
        </div>
    );
};

const useStyles = makeStyles({
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        display: 'none',
    },
    label: {
        display: 'flex',
        cursor: 'pointer',
    },
    icon: {
        marginRight: 6,
    },
    button: {
        marginRight: 30,
    },
    file: {
        marginRight: 30,
        fontWeight: 'bold',
    },
});
