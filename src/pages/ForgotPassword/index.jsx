import React from 'react';
import '../../assets/style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
            fetch('https://app.compreagua.com.br/api.php?action=forgot-password', {
                method: 'PUT',
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
                        toast.error(retorno_convert.message);
                    } else {
                        toast.success('Aguarde a empresa analisar seu pedido');

                       
                    }
                });
        } catch (error) {
            console.error('Erro durante a solicitação:', error);
        }
    };

    const digitar = (e) => {
        setObjLogin({ ...objLogin, [e.target.name]: e.target.value });
    }
    const voltar = () => {
        // Usando window.history.back() ou window.history.go(-1) para voltar
        window.history.back();
      };


    return (
        <>
            <section className="body-container">
                <ToastContainer />
                <section className="Container">
                    <section className="Content_reset" >
                        <div className="Main_content_reset" >
                            <h1>Esqueceu a senha?</h1>
                            <p>Se você  esqueceu sua senha poderá solicitar uma redefinição inserindo seu Login </p>
                            <form className="FormLogin">
                                <Input className="input-cad" placeholder="Login" name="login" label="Login" eventoTeclado={digitar} />
                            </form>
                            <div className="div-button">
                                <Button nome="Solicitar" classname="Button" funcao={resetSenha} />
                                <Button nome="Voltar" classname="voltar" funcao={voltar} />
                            </div>
                        </div >
                    </section>
                </section>
            </section>
        </>
    );
};

export { ForgotPassword };