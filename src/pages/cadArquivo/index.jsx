import "../../assets/style.css"
import Sidebar from "../../components/Sidebar"
import InputUpload from '../../components/InputUpload'
import Input from '../../components/Input'
import Button from '../../components/Button';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';



const CadArquivoEmp = () => {


  

    const { pastaCliente } = useParams();
    console.log(pastaCliente);
    const [files, setFiles] = useState(0);
    const [uploaded,setUploaded] = useState(false);
const [fileCount, setFileCount] = useState(0);

 const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    setFileCount(selectedFiles.length + " file(s) selected");
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
  
  const digitar = (e) => {
    setObjPasta({ ...objPasta, [e.target.name]: e.target.value });
  }
return (

    <>

      <Sidebar page="Cadastrar arquivo" />

      < section className="main">

        <div className="upload">
          <h1>
            Upload de Arquivo
          </h1>
          <InputUpload Count={fileCount} onChange={handleFileChange} onClick={handleUpload} className="input" placeholder="Pasta" label="Pasta" />
        </div>

        <div className="subpasta">
          <h1 >
            Criar subpasta
          </h1>
          <div className="input_subPasta">
            <Input placeholder="Nome do cliente" label="Nome do cliente" name="nomeUser" eventoTeclado={digitar} obj={objPasta.pastaCliente} />
          </div>
          <div className="button">
            <Button nome="Cadastrar" classname="Cadastrar"  />
          </div>
        </div>
      </section>

    </>
  )
}


export { CadArquivoEmp };