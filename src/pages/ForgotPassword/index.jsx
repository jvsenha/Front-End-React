import React from 'react';
import '../../assets/style.css';
import { useState } from "react";
import Input from '../../components/Input'
import Button from '../../components/Button';

const ForgotPassword = () => {
    const Login = {
        login: ""
    }
    const [objLogin, setObjLogin] = useState(Login);

    const resetSenha = () => {
        try {
            fetch('http://localhost:8080/reset/forgot-password', {
                    method: 'POST',
                    body: JSON.stringify(objLogin),
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json',
                    }
                })
                .then(retorno => retorno.json())
                .then(retorno_convert => {
                    console.log(objLogin);
                    
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
        setObjLogin({ ...objLogin, [e.target.name]: e.target.value });
    }
    return (
        <>
            <section className="body-container">
                <section className="Container">
                    <section className="Content_reset" >
                        <div className="Main_content_reset" >
                            <h1>Esqueceu a senha?</h1>
                            <p>Se você  esqueceu sua senha poderá solicitar uma redefinição inserindo seu Login </p>
                            <form className="FormLogin">
                                <Input className="input-cad" placeholder="Nome de Usuario" name="login" label="Nome de Usuario" eventoTeclado={digitar} />
                            </form>
                            <Button nome="Solicitar" classname="Button" funcao={ resetSenha }  />
                        </div >
                    </section>
                </section>
            </section>
        </>
    );
};

export { ForgotPassword };