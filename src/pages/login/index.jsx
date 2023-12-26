// pages/Home/index.jsx

import "../../assets/style.css";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Logo from "../../assets/Imagens/Primus_branca.png";
import LinkButton from "../../components/Link-Button";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const Credeciais = {
    login: "",
    senha_user: "",
  };
  const [objCredeciais, setObjCredeciais] = useState(Credeciais);
  const [userRole, setUserRole] = useState(null);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [isBtnVisible, setIsBtnVisible] = useState(false);

  const toggleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const redirectToHome = (role) => {
    if (role !== "cliente") {
      window.location.href = "http://localhost:3000/homeemp";
    } else {
      window.location.href = "http://localhost:3000/homeclt";
    }
  };

  const logar = () => {
    fetch("http://localhost:8000/api.php?action=login", {
      method: "POST",
      body: JSON.stringify(objCredeciais),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((retorno) => retorno.json())
      .then((retorno_convert) => {
        if (retorno_convert.message !== undefined) {
          toast.error(retorno_convert.message);
        } else {
          localStorage.setItem("token", retorno_convert.session_data.token);

          fetch("http://localhost:8000/api.php?action=decodeToken", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${retorno_convert.session_data.token}`, 
            },
          })
            .then((retorno) => retorno.json())
            .then((retorno_convert) => {
              if (retorno_convert.message !== undefined) {
                alert(retorno_convert.message);
              } else {
                setUserRole(retorno_convert.role);
                redirectToHome(retorno_convert.role);
              }
            })
            .catch((error) => {
              console.error("Erro ao verificar token após o login:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Erro ao autenticar:", error);
      });
  };

  const digitar = (e) => {
    setObjCredeciais({ ...objCredeciais, [e.target.name]: e.target.value });
    setIsBtnVisible(e.target.name === "senha_user" && e.target.value !== "");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      logar();
    }
  };

  return (
    <>
      <section className="body-container">
        <ToastContainer />
        <section className="Container">
          <section className="Content">
            <div className="Main_content">
              <h1>Fazer login</h1>
              <form className="FormLogin">
                <Input
                  className="input-cad"
                  placeholder="Nome de Usuario"
                  name="login"
                  label="Nome de Usuario"
                  maxLength={49}
                  eventoTeclado={digitar}
                  onKeyDown={handleKeyDown}
                />
                <Input
                  className="input-cad"
                  placeholder="Senha"
                  name="senha_user"
                  label="Senha"
                  type={mostrarSenha ? "text" : "password"}
                  eventoTeclado={digitar}
                  onKeyDown={handleKeyDown}
                />
                <button
                  type="button"
                  onClick={toggleMostrarSenha}
                  className={`vision-cad ${isBtnVisible ? "" : "close-btn"}`}
                >
                  <span>
                    {mostrarSenha ? "Esconder Senha" : "Mostrar Senha"}
                  </span>
                </button>
              </form>

              <Button nome="Entrar" classname="Button" funcao={logar} />
              <div>
                <LinkButton
                  nome="Esqueci a senha"
                  classname="Voltar"
                  link="/forgotPassword"
                />
              </div>
            </div>
          </section>
          <section className="Content dark">
            <img className="img-login" src={Logo} alt="" />
          </section>
        </section>
      </section>
    </>
  );
};

export { Home };
