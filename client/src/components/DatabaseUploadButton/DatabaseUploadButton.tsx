import React, { useState, SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, Input } from '@material-ui/core';
import { CloudUpload, DescriptionSharp } from '@material-ui/icons';
import { Button } from '../../components/Button';

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
            <Button className={classes.button} color="primary">
                <label className={classes.label}>
                    <DescriptionSharp className={classes.icon} />
                    <span>{t('database-upload.choose-file')}</span>
                    <Input type="file" id="file" className={classes.input} onChange={onSelectFile} value={file} />
                </label>
            </Button>
            <div className={classes.file}>{file.replace(/^.*\\/, '')}</div>
            {Boolean(file) && (
                <Button>
                    <CloudUpload className={classes.icon} />
                    <span>{t('database-upload.upload-file')}</span>
                </Button>
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
