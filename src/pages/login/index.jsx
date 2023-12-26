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
      // Redireciona para a home do emp se o usuário não for cliente
      window.location.href = "https://compreagua.com.br/homeemp";
    } else {
      // Redireciona para a home do cliente se o usuário for cliente
      window.location.href = "https://compreagua.com.br/homeclt";
    }
  };

  const logar = () => {
    // Faz a autenticação diretamente
    fetch("https://app.compreagua.com.br/api.php?action=login", {
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
          // Armazena o token na sessão
          localStorage.setItem("token", retorno_convert.session_data.token);

          // Verifica o token após o login
          fetch("https://app.compreagua.com.br/api.php?action=decodeToken", {
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
                // Se o retorno_convert já é um objeto, você pode acessar diretamente a propriedade 'role'
                setUserRole(retorno_convert.role);

                // Redireciona para a home com base na role
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

  return (
    <>
      <section className="body-container">
        <ToastContainer />
        <section className="Container">
          <section className="Content">
            <div className="Main_content">
              <h1>Fazer Login</h1>
              <form className="FormLogin">
                <Input
                  className="input-cad"
                  placeholder="Login"
                  name="login"
                  maxLength={49}
                  label="Login"
                  eventoTeclado={digitar}
                />
                <Input
                  className="input-cad"
                  placeholder="Senha"
                  name="senha_user"
                  label="Senha"
                  type={mostrarSenha ? "text" : "password"}
                  eventoTeclado={digitar}
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
