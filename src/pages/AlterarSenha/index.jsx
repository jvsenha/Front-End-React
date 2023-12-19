import React, { useState } from "react";
import "../../assets/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Navbar from "../../components/Navbar";

const AlterarSenha = () => {
  const token = localStorage.getItem('token');
  const { idUser } = useParams();
  const [senhaUser, setSenhaUser] = useState("");
  const [confirmSenhaUser, setConfirmSenhaUser] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const resetSenha = () => {
    if (senhaUser === confirmSenhaUser) {
      const dadosAtualizados = {
        id_user: idUser,
        senha_user: senhaUser,
      };

      fetch(`http://localhost:8000/api.php?action=alterarSenha`, {
        method: "PUT",
        body: JSON.stringify(dadosAtualizados),
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((retorno) => {
          if (!retorno.ok) {
            throw new Error(
              `Erro na requisição: ${retorno.status} ${retorno.statusText}`
            );
          }
          return retorno.json();
        })
        .then((retorno_convert) => {
          if (retorno_convert.error !== undefined) {
            toast.error(retorno_convert.error);
          } else {
            toast.success(retorno_convert.message, {
              autoClose: 3000,
            });
          }
        })
        .catch((error) => {
          console.error(`Erro na requisição: ${error.message}`);
          toast.error(`Erro na requisição: ${error.message}`);
        });
    } else {
      toast.error("As senhas devem ser iguais");
    }
  };

  const toggleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const voltar = () => {
    // Usando window.history.back() ou window.history.go(-1) para voltar
    window.history.back();
  };

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/boxicons@2.1.0/css/boxicons.min.css"
        rel="stylesheet"
      />

      <Navbar />
      <ToastContainer />
      <section className="body-container">
        <section className="Container-senha ">
          <section className="Content_reset">
            <div className="Main_content_reset">
              <h1>Alterar Senha</h1>
              <p>
                Escreva a nova senha e a confirme, as duas devem ser idênticas{" "}
              </p>
              <form className="FormSenha">
                <div className="div-senha">
                  <Input
                    className="input-cad"
                    placeholder="Senha"
                    name="senhaUser"
                    type={mostrarSenha ? "text" : "password"}
                    label="Senha"
                    eventoTeclado={(e) => setConfirmSenhaUser(e.target.value)}
                  />
                </div>
                <div className="div-senha"> 
                  <Input
                    className="input-cad"
                    placeholder="Confirmar Senha"
                    name="confirmsenha"
                    type={mostrarSenha ? "text" : "password"}
                    label="Confirmar Senha"
                    eventoTeclado={(e) => setSenhaUser(e.target.value)}
                  />{" "}
                  <button
                    type="button"
                    onClick={toggleMostrarSenha}
                    className="vision"
                  >
                    <span>
                      <i className="bx bx-low-vision"></i>
                    </span>
                  </button>
                </div>
              </form>
              <div className="div-button-cliente">
                <Button nome="Alterar" classname="Button" funcao={resetSenha} />
                <Button nome="Voltar" classname="voltar" funcao={voltar} />
              </div>
            </div>
          </section>
        </section>
      </section>
    </>
  );
};

export { AlterarSenha };
