import React, { useState, ChangeEvent } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Typography, Button, TextField, makeStyles } from '@material-ui/core';
import { createMessage } from '../../queries/newsletterQueries';
import { openAlertDialog } from '../../components/AlertDialog';

const initialState = {
    type: '',
    topic: '',
    recipients: [],
};

export const Newsletter = () => {
    const classes = useStyles();
    const [fields, setFields] = useState(initialState);
    const [message, setMessage] = useState('');
    const { type, topic, recipients } = fields;


    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { id, value } = event.target;
        setFields(prevFields => ({
            ...prevFields,
            [id]: value,
        }));
    };

    const handleSubmit = () => {
        createMessage({ type, topic, recipients, message })
            .then((response) => {
                if (response.error) { return openAlertDialog({ type: 'error', description: `${response.error}` }); }
                return openAlertDialog({ type: 'success', description: `Newletter został wysłany. Jego ID to: ${response.documentId}` });
            });
    };

    return (
        <div className={classes.container}>
            <Typography variant="h2" gutterBottom className={classes.h2}>
                Newsletter
            </Typography>
            <div className={classes.inputFields}>
            <TextField
                required
                onChange={handleChange}
                value={type}
                id="type"
                label="Type"
                fullWidth
            />
            <TextField
                required
                onChange={handleChange}
                value={topic}
                id="topic"
                label="Topic"
                fullWidth
            />
            <TextField
                required
                onChange={handleChange}
                value={recipients}
                id="recipients"
                label="Recipients"
                fullWidth
            />
            </div>
            <WorkSpace message={message} setMessage={setMessage}/>
            <Button onClick={handleSubmit}>Wyślij</Button>
        </div>
    );
};

const WorkSpace = (props: any) => {
    
    const handleChange = (value: string) => {
        props.setMessage(value);
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, false] }],
            [{ 'font': [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'align': [] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            ['link', 'image', 'video'],
            ['clean']
        ],
        imageResize: {
            modules: ['Resize', 'DisplaySize', 'Toolbar']
        }
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    return (
        <ReactQuill value={props.message} onChange={handleChange} theme="snow" modules={modules}
            formats={formats} placeholder="Tu wpisz swoją wiadomość" />
    );
};

const useStyles = makeStyles({
    h2: {
        marginTop: '100px',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    inputFields: {
        marginBottom: '40px'
    }
});