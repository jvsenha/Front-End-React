import "../../assets/style.css"
import Sidebar from "../../components/Sidebar"
import InputUpload from '../../components/InputUpload'
import Input from '../../components/Input'
import Button from '../../components/Button';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';



const CadArquivoEmp = () => {
  const { pastaCliente } = useParams();
  const { idUser } = useParams();
  const [files, setFiles] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [fileCount, setFileCount] = useState(0);
  const token = localStorage.getItem('token');


  const arquivo = {
    nomeDocumento: "",
    tamanhoDocumento: "",
    linkDocumento: "",
  }
  const [objArquivo, setObjArquivo] = useState(arquivo);

  const handleFileSelect = (e) => {
    const selectedFiles = e.target.files;
    setFiles(selectedFiles);
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
          const responseData = await response.json(); // Extrair os dados JSON da resposta
          const fileResponses = responseData.responses;
          if (fileResponses.length > 0) {
            const primeiraResposta = fileResponses[0];
        
            // Crie um novo objeto 'arquivo' com as informações da primeira resposta
            const novoArquivo = {
              nomeDocumento: primeiraResposta.fileName,
              tamanhoDocumento: primeiraResposta.fileSize,
              linkDocumento: primeiraResposta.webViewLink,
            };
        
            // Atualize o estado 'objArquivo' com o novo objeto 'arquivo'
            setObjArquivo(novoArquivo);

            const responseArquivo = await fetch(`http://localhost:8080/documentos/cadastrar?userId=${idUser}`, {
              method: 'POST',
              body: JSON.stringify(novoArquivo),
              headers: {
                  'Content-type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${token}`
              }
              
          });
          const retorno_convert = await responseArquivo.json();
    
                if (retorno_convert.message !== undefined) {
                    alert(retorno_convert.message);
                } else {
                    
                    alert('Doc Cadastrado com sucesso!!');
                }
          } else {
            console.error('Nenhuma resposta de arquivo encontrada.');
          }
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

      < section className="main">
        <div className="upload">
          <h1>
            Upload de Arquivo
          </h1>
    
            <InputUpload onChange={handleFileSelect} funcao={handleUpload} Count={fileCount} className="input" placeholder="Pasta" label="Pasta" />
          
        </div>
        <div className="subpasta">
          <h1 >
            Criar subpasta
          </h1>
          <div className="input_subPasta">
            <Input placeholder="Nome do cliente" label="Nome do cliente" name="nomeUser" />
          </div>
          <div className="button">
            <Button nome="Cadastrar" classname="Cadastrar" />
          </div>
        </div>
      </section>

    </>
  )
}


export { CadArquivoEmp };