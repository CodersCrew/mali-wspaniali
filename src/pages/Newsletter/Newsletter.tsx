import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Typography, Button, makeStyles } from '@material-ui/core';

export const Newsletter = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Typography variant="h2" gutterBottom className={classes.h2}>
                Newsletter
            </Typography>
            <WorkSpace />
        </div>
    );
};

const WorkSpace = () => {
    const [text, setText] = useState('');

    const handleChange = (value: any) => {
        setText(value);
    };

    const handleSubmit = () => {
        console.log(text);
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
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    return (
        <>
            <ReactQuill value={text} onChange={handleChange} theme="snow" modules={modules}
                formats={formats} placeholder="Tu wpisz swoją wiadomość" />
            <Button onClick={handleSubmit}>Wyślij</Button>
        </>
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
});