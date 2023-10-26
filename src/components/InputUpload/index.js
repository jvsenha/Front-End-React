import React, { useState } from 'react';
import './style.css'
const InputUpload = ({ placeholder, label, eventoTeclado, name, obj }) => {
  const [fileCount, setFileCount] = useState(0);

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFileCount(files.length);
  };

  return (
    <form action="upload.php" className='form-file' method="POST">
      <input className='form-input' type="file" multiple onChange={handleFileChange} />
      <p className='form-p'>{fileCount} Arquivo(s) selecionados</p>
      <button  className='form-button' type="submit">Upload</button>
    </form>
  );
};

export default InputUpload;