import React from 'react';
import '../../assets/style.css';
import { useState } from "react";
import Input from '../../components/Input'
import Button from '../../components/Button';
import Navbar from "../../components/Navbar";
const AlterarSenha = () => {
    const Senha = {
        senha: "",
        confirmsenha: ""
    }
    const [objSenha, setObjSenha] = useState(Senha);

    const resetSenha = () => {
        try {
            fetch('http://localhost:8080/reset/forgot-password', {
                method: 'POST',
                body: JSON.stringify(objSenha),
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                }
            })
                .then(retorno => retorno.json())
                .then(retorno_convert => {
                    console.log(objSenha);

                    if (retorno_convert.message !== undefined) {
                        alert(retorno_convert.message);
                    } else {
                        alert('Aguarde a empresa analisar seu pedido');

                        window.location.assign("http://localhost:3000/");
                    }
                });
        } catch (error) {
            console.error('Erro durante a solicitação:', error);
        }
    };

    const digitar = (e) => {
        setObjSenha({ ...objSenha, [e.target.name]: e.target.value });
    }
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
                                <Input className="input-cad" placeholder="Senha" name="senha" label="Senha" eventoTeclado={digitar} />
                                <Input className="input-cad" placeholder="Confirmar Senha" name="confirmsenha" label="Confirmar Senha" eventoTeclado={digitar} />
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