import "../../assets/style.css";
import Sidebar from "../../components/Sidebar";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const validarEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const ConfiguracoesAdm = () => {
  const token = localStorage.getItem("token");
  const { idUser } = useParams();
  // Estado para os campos do formulário
  const [nomeUser, setNomeUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [login, setLogin] = useState("");
  const [senhaUser, setSenhaUser] = useState("");
  const [role, setRole] = useState("");
  const [isenabled, setIsenabled] = useState("");

  // useEffect para carregar os dados do empresa
  useEffect(() => {
    const carregarEmpresa = async () => {
      try {
        const idUserObj = {
          id_user: idUser,
        };

        const response = await fetch(
          "https://app.compreagua.com.br/api.php?action=carregarEmpresa",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(idUserObj),
          }
        );

        if (!response.ok) {
          throw new Error(`Erro ao carregar empresa: ${response.status}`);
        }

        const objempresaData = await response.json();

        // Atualize os estados com os valores obtidos da API
        setNomeUser(objempresaData.nome_user);
        setEmailUser(objempresaData.email_user);
        setLogin(objempresaData.login);
        setSenhaUser(objempresaData.senha_user);
        setRole(objempresaData.role);
        setIsenabled(objempresaData.is_enabled);
      } catch (error) {
        console.error("Error fetching empresa:", error.message);
      }
    };

    carregarEmpresa();
  }, [idUser]);
  // Certifique-se de definir idUser antes de usar neste useEffect

  // Função para lidar com a submissão do formulário
  const alterar = () => {
    // Validação do e-mail
    if (!validarEmail(emailUser)) {
      toast.error("Por favor, insira um e-mail válido.");
      return;
    }

    // Lógica para enviar os dados atualizados para o servidor
    const dadosAtualizados = {
      id_user: idUser,
      nome_user: nomeUser,
      login: login,
      senha_user: senhaUser,
      role: role,
      email_user: emailUser,
      is_enabled: isenabled,
    };

    fetch(`https://app.compreagua.com.br/api.php?action=alterarUsuario`, {
      method: "PUT",
      body: JSON.stringify(dadosAtualizados),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 422) {
          return response.json().then((data) => {
            toast.error(`Erro: ${data.error}`);
          });
        } else if (response.status === 200) {
          toast.success("Operação realizada com sucesso!");
        } else {
          console.error(
            `Erro na requisição: ${response.status} ${response.statusText}`
          );
          toast.error("Erro na requisição");
        }
      })
      .catch((error) => {
        console.error(`Erro na: ${error.message}`);
        toast.error(`Erro na: ${error.message}`);
      });
  };

  const voltar = () => {
    // Usando window.history.back() ou window.history.go(-1) para voltar
    window.history.back();
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      alterar();
    }
  };
  return (
    <>
      <Sidebar page="Configurações" />
      <ToastContainer />
      <div className="Main-cadC">
        <form className="Form">
          <div className="input-cad">
            <Input
             onKeyDown={handleKeyDown}
              placeholder="Nome"
              label="Nome"
              maxLength={99}
              name="nomeUser"
              eventoTeclado={(e) => setNomeUser(e.target.value)}
              obj={nomeUser}
            />
          </div>
          <div className="input-cad">
            <Input
             onKeyDown={handleKeyDown}
              className="input-cad"
              placeholder="Login"
              name="login"
              maxLength={49}
              label="Login"
              eventoTeclado={(e) => setLogin(e.target.value)}
              obj={login}
            />
          </div>
          <div className="input-cad">
            <Input
             onKeyDown={handleKeyDown}
              className="input-cad"
              placeholder="E-mail"
              name="emailUser"
              label="E-mail"
              maxLength={99}
              type="email"
              eventoTeclado={(e) => setEmailUser(e.target.value)}
              obj={emailUser}
            />
          </div>

          <div className="button">
            <Button nome="Alterar" classname="Alterar" funcao={alterar} />
            <Button nome="Voltar" funcao={voltar} />
          </div>
        </form>
      </div>
    </>
  );
};

export { ConfiguracoesAdm };
