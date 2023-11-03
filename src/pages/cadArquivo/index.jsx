import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import InputUpload from '../../components/InputUpload';
import Input from '../../components/Input';
import Button from '../../components/Button';

const CadArquivoEmp = () => {
  const { pastaCliente } = useParams();
  const [files, setFiles] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const [token, setToken] = useState(null);

  

  const Pasta = {
    subPasta: " ",
  }
  const [objPasta, setObjPasta] = useState(Pasta);

  const limparform = () => {
    setObjPasta(Pasta)
  }

  const handleFileChange = (e) => {
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
  

  const subPasta = async () => {
    try {
      const response = await fetch(`http://localhost:8000/subPasta/${pastaCliente}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          subPasta: objPasta.subPasta})
      });

      if (response.ok) {
        const pastaId = await response.text();
        setObjPasta({... objPasta, subPasta:pastaId})
        alert('Subpasta criada no Google Drive com sucesso!');
      } else {
        alert('Erro ao criar a subpasta no Google Drive.');
      }
    } catch (error) {
      console.error('Erro durante o cadastro:', error);
    }
  };
const digitar = (e) => {
  setObjPasta({ ...objPasta, [e.target.name]: e.target.value });
}; 
useEffect(() => {
  async function checkAuthentication() {
    const response = await fetch('http://localhost:8000/check-auth');
    if (response.ok) {
      const data = await response.json();
      setToken(data.token);
    } else {
      // Se o usuário não estiver autenticado, redirecione para autenticação
      window.location.href = 'http://localhost:8000/auth/google';
    }
  }
  checkAuthentication();
}, []);

return (
  <>
    <Sidebar page="Cadastrar arquivo" />
    <section className="main">
      <div className="upload">
        <h1>Upload de Arquivo</h1>
        <InputUpload Count={files.length + " file(s) selected"} onChange={handleFileChange} onClick={handleUpload} className="input" placeholder="Pasta" label="Pasta" />
      </div>
      <div className="subpasta">
        <h1>Criar subpasta</h1>
        <form action="">
        <div className="input_subPasta">
          <Input placeholder="Nome da pasta" label="Nome da pasta" name="subPasta" eventoTeclado={digitar} obj={objPasta.subPasta} />
        </div>
        <div className="button">
          <Button nome="Criar Subpasta" classname="Cadastrar" funcao={subPasta} />
        </div>
        </form>
      </div>
    </section>
  </>
);
};

export { CadArquivoEmp };
