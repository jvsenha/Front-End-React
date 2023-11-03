
import React, { useState } from 'react';
import './style.css'
const InputUpload = ({ onChange, funcao, Count }) => {

  return (
    <form className='form-file'>
      <label className='arquivos' htmlFor="arquivo"><p className=''>{Count} Arquivo(s) selecionados</p></label>
      <input type="file" name="arquivo" id="arquivo" onChange={onChange} />
      <button onClick={funcao} className='form-button' type="button">Upload</button>
    </form>



  );
};

export default InputUpload;