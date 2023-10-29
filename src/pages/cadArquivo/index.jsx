import "./style.css"
import Sidebar from "../../components/Sidebar"
import InputUpload from '../../components/InputUpload'
import React, { useState } from 'react';



const CadArquivoEmp = () => {
    const [file, setFile] = useState(0);
    const [uploaded, setUploaded] = useState(false);

    const handleFileSelect = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('http://localhost:8000/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    setUploaded(true);
                } else {
                    console.error('Erro ao fazer o upload do arquivo.');
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
                        <InputUpload onChange={handleFileSelect} onClick={handleUpload} className="input" placeholder="Pasta" label="Pasta" />
                    </div>
                </form>
            </div>

        </>
    )
}


export { CadArquivoEmp };