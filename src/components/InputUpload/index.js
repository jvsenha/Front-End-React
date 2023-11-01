import Button from '../../components/Button';
import React, { useState } from 'react';
import './style.css'
const InputUpload = ({ onChange, onClick, Count}) => {
  const [fileCount, setFileCount] = useState(0);

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFileCount(files.length);
  };

  return (

    <form className=''>   
    <label className='arquivos' for="arquivo"><p className=''>{Count} Arquivo(s) selecionados</p></label>
    <input type="file" name="arquivo" id="arquivo"  onChange={onChange} />
      
      <Button nome="Upload"  funcao={onClick} />

    </form>
  );
};

export default InputUpload;