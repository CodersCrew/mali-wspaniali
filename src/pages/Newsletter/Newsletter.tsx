import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const Newsletter = () => {

    return (
        <WorkSpace />
    );
};


const WorkSpace = () => {

    const [ text, setText ] = useState('');
    
    const handleChange = (value:any) => {
      setText(value);
    };
  
      return (
        <ReactQuill value={text}
            onChange={handleChange} />
      );
  };