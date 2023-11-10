import React from 'react';
import '../../assets/style.css';
import { useState } from "react";
import { useParams } from 'react-router-dom';
import Input from '../../components/Input'
import Button from '../../components/Button';
import Navbar from "../../components/Navbar";

const AlterarSenha = () => {
    const { idUser } = useParams();
    const [senhaUser, setSenhaUser] = useState("");
    const [confirmSenhaUser, setConfirmSenhaUser] = useState("");
    
    const resetSenha = () => {
        if(senhaUser===confirmSenhaUser){
        const dadosAtualizados = {
            senhaUser,
        };
        const token = localStorage.getItem('token');
        fetch(`http://localhost:8080/cliente/alterarsenha/${idUser}`, {
            method: 'PUT',
            body: JSON.stringify(dadosAtualizados),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    
            .then(retorno => retorno.json())
            .then(retorno_convert => {
                if (retorno_convert.message !== undefined) {
                    alert(retorno_convert.message);
                    window.location.assign("http://localhost:3000/homeclt")
                }
            });
    }else{
        alert("as senhas devem ser iguais");
    }




    
        };


return (
    <>
        <Navbar />
        <section className="body-container">
            <section className="Container-senha ">
                <section className="Content_reset" >

                    <div className="Main_content_reset" >
                        <h1>Alterar Senha</h1>
                        <p>Escreva a nova senha e a confirme, as duas devem ser idênticas </p>
                        <form className="FormSenha">
                            <Input className="input-cad" placeholder="Senha" name="senhaUser" label="Senha" eventoTeclado={e => setConfirmSenhaUser(e.target.value)}  />
                            <Input className="input-cad" placeholder="Confirmar Senha" name="confirmsenha" label="Confirmar Senha" eventoTeclado={e => setSenhaUser(e.target.value)}/>
                        </form>
                        <Button nome="Alterar" classname="Button" funcao={resetSenha} />
                    </div >
                </section>
            </section>
        </section>
    </>
);
    }

export { AlterarSenha };