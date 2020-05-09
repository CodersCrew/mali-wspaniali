import React, { useState } from 'react';
import { makeStyles, Button, Input } from '@material-ui/core';
import { CloudUpload, DescriptionSharp } from '@material-ui/icons';

export const DatabaseUploadButton = () => {
    const classes = useStyles();
    const [state, setState] = useState({
        file: '',
    });

    const { file } = state;

    const onChangeFile = (e: React.SyntheticEvent<EventTarget>) => {
        e.preventDefault();
        const inputValue = (e.target as HTMLInputElement).value;
        const inputId = (e.target as HTMLInputElement).id;
        setState(prev => ({
            ...prev,
            [inputId]: inputValue,
        }));
    };

    return (
        <div className={classes.container}>
            <Button className={classes.button} variant="contained" color="primary">
                <label className={classes.label}>
                    <DescriptionSharp className={classes.icon} /> Choose File
                    <Input type="file" id="file" className={classes.input} onChange={onChangeFile} value={file} />
                </label>
            </Button>
            <div className={classes.file}>{file}</div>
            {Boolean(file) ? (
                <Button variant="contained" color="secondary">
                    <CloudUpload className={classes.icon} /> Upload File
                </Button>
            ) : null}
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
        marginRight: 20,
    },
});
