import "../../assets/style.css";
import Sidebar from "../../components/Sidebar";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const validarEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const AlterarCliente = () => {
  const token = localStorage.getItem('token');
  const { idUser } = useParams();

  // Estado para os campos do formulário
  const [nomeUser, setNomeUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [login, setLogin] = useState("");
  const [senhaUser, setSenhaUser] = useState("");
  const [pastaCliente, setPastaCliente] = useState("");
  const [role, setRole] = useState("");
  const [isenabled, setIsenabled] = useState("");
  const [reset, setReset] = useState("");

  // useEffect para carregar os dados do cliente
  useEffect(() => {
    const carregarCliente = async () => {
      try {
        const idUserObj = {
          id_user: idUser,
        };

        const response = await fetch(
          "https://app.compreagua.com.br/api.php?action=carregarCliente",
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
          throw new Error(`Erro ao carregar cliente: ${response.status}`);
        }

        const objClienteData = await response.json();

        // Atualize os estados com os valores obtidos da API
        setNomeUser(objClienteData.nome_user);
        setEmailUser(objClienteData.email_user);
        setLogin(objClienteData.login);
        setSenhaUser(objClienteData.senha_user);
        setPastaCliente(objClienteData.pasta_cliente);
        setRole(objClienteData.role);
        setIsenabled(objClienteData.is_enabled);
        setReset(objClienteData.reset);
      } catch (error) {
        console.error("Error fetching cliente:", error.message);
      }
    };

    carregarCliente();
  }, [idUser]);

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
        pastaCliente: pastaCliente,
        reset: reset,
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

  return (
    <>
      <Sidebar page="Alterar cliente" />
      <ToastContainer />
      <div className="Main-cadC">
        <form className="Form">
          <div className="input-cad">
            <Input
              placeholder="Nome do Usuário"
              label="Nome do Usuário"
              name="nomeUser"
              eventoTeclado={(e) => setNomeUser(e.target.value)}
              obj={nomeUser}
            />
          </div>
          <div className="input-cad">
            <Input
              className="input-cad"
              placeholder="E-mail"
              name="emailUser"
              label="E-mail"
              eventoTeclado={(e) => setEmailUser(e.target.value)}
              obj={emailUser}
            />
          </div>
          <div className="input-cad">
            <Input
              className="input-cad"
              placeholder="Login"
              name="login"
              label="Login"
              eventoTeclado={(e) => setLogin(e.target.value)}
              obj={login}
            />
          </div>

          <div className="input-cad">
            <Input
              className="input-cad"
              placeholder="Pasta do Cliente"
              label="Pasta do Cliente"
              name="pastaCliente"
              eventoTeclado={(e) => setPastaCliente(e.target.value)}
              obj={pastaCliente}
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

export { AlterarCliente };
