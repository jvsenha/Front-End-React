import React from "react";
import "../../assets/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";

const ForgotPassword = () => {
  const Login = {
    login: "",
  };
  const [objLogin, setObjLogin] = useState(Login);

  const resetSenha = () => {
    try {
      fetch("https://app.compreagua.com.br/api.php?action=forgot-password", {
        method: "PUT",
        body: JSON.stringify(objLogin),
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((retorno_convert) => {
          if (retorno_convert.error) {
            toast.error(retorno_convert.error);
          } else {
            toast.success(retorno_convert.message);
          }
        })
    } catch (error) {
      console.error("Erro durante a solicitação:", error.message);
    }
};

  
  const digitar = (e) => {
    setObjLogin({ ...objLogin, [e.target.name]: e.target.value });
  };

  const voltar = () => {
    // Usando window.history.back() ou window.history.go(-1) para voltar
    window.history.back();
  };
 const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      resetSenha();
    }
  };

  return (
    <>
      <section className="body-container">
        <ToastContainer />
        <section className="Container">
          <section className="Content_reset">
            <div className="Main_content_reset">
              <h1>Esqueceu a senha?</h1>
              <p>
                Se você esqueceu sua senha poderá solicitar uma redefinição
                inserindo seu Login{" "}
              </p>
              <form className="FormLogin">
                <Input
                  className="input-cad"
                  placeholder="Nome de Usuario"
                  name="login"
                  label="Nome de Usuario"
                  eventoTeclado={digitar}
                />
              </form>
              <div className="div-button">
                <Button
                  nome="Solicitar"
                  classname="Button"
                  funcao={resetSenha}
                />
                <Button nome="Voltar" classname="voltar" funcao={voltar} />
              </div>
            </div>
          </section>
        </section>
      </section>
    </>
  );
};

export { ForgotPassword };