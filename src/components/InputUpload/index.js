import React, { useState } from 'react';
import './style.css'
const InputUpload = ({ onChange, onClick }) => {
  const [fileCount, setFileCount] = useState(0);

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFileCount(files.length);
  };

  return (
    <form className='form-file'>
      <input className='form-input' type="file" onChange={onChange} />
      <p className='form-p'>{fileCount} Arquivo(s) selecionados</p>
      <button  onClick={onClick} className='form-button' type="submit">Upload</button>
    </form>
  );
};

export default InputUpload;