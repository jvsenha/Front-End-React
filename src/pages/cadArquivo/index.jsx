import "./style.css"
import Sidebar from "../../components/Sidebar"
import InputUpload from '../../components/InputUpload'
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';



const CadArquivoEmp = () => {
    const { pastaCliente } = useParams();
    console.log(pastaCliente);
    const [files, setFiles] = useState(0);
    const [uploaded,setUploaded] = useState(false);

    const handleFileSelect = (e) => {
        const selectedFiles = e.target.files;
        setFiles(selectedFiles);
    };

    const handleUpload = async () => {
      if (files.length > 0) {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          formData.append('files', files[i]);
        }
       
        try {
          const response = await fetch(`http://localhost:8000/upload/${pastaCliente}`, {
            method: 'POST',
            body: formData,
          });
  
          if (response.ok) {
            setUploaded(true);
          } else {
            console.error('Erro ao fazer o upload dos arquivos.');
          }
        } catch (error) {
          console.error('Erro ao fazer a solicitação:', error);
        }
      }
    };

    return (

        <>

            <Sidebar page="Cadastrar arquivo" />

            < div className="Main">
                <form className="Form" >

                    <div className="input">
                        <InputUpload onChange={handleFileSelect} funcao={handleUpload} className="input" placeholder="Pasta" label="Pasta" />
                    </div>
                </form>
            </div>

        </>
    )
}


export { CadArquivoEmp };