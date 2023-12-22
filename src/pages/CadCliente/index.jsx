import "../../assets/style.css";
import Sidebar from "../../components/Sidebar";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CadClienteEmp = () => {
  const token = localStorage.getItem("token");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [isBtnVisible, setIsBtnVisible] = useState(false);
  const [pastas, setPastas] = useState([]);
  // Objeto cliente
  const cliente = {
    nome_user: "",
    login: "",
    senha_user: "",
    role: "cliente",
    email_user: "",
    is_enabled: 1,
    pastaCliente: "",
    reset: 0,
  };
  const [objCliente, setObjCliente] = useState(cliente);

  const limparform = () => {
    setObjCliente(cliente);
  };

  useEffect(() => {
    const fetchArquivos = async () => {
      try {
        const filesResponse = await fetch(
          "https://app.compreagua.com.br/api.php?action=listarArquivo",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (filesResponse.ok) {
          const filesData = await filesResponse.json();
          setPastas(filesData);
        } else {
          throw new Error("Erro ao obter os arquivos.");
        }
      } catch (error) {
        console.error("Erro ao buscar arquivos", error);
      }
    };

    if (token) {
      fetchArquivos();
    }
  }, [token]);

  // dados dos formularios
  const cadastrar = async () => {
    try {
      const responseCliente = await fetch(
        "https://app.compreagua.com.br/api.php?action=cadastrarUsuario",
        {
          method: "POST",
          body: JSON.stringify(objCliente),
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (responseCliente.status === 422) {
        try {
          const retorno_convert = await responseCliente.json();
          toast.error(`Erro: ${retorno_convert.error}`);
        } catch (jsonError) {
          console.error("Erro ao analisar JSON:", jsonError);
          toast.error("Erro na requisição");
        }
      } else if (responseCliente.status === 200) {
        toast.success("Cliente Cadastrado com sucesso!!");
        limparform();
      } else {
        console.error(
          `Erro na requisição: ${responseCliente.status} ${responseCliente.statusText}`
        );
        toast.error("Erro na requisição");
      }
    } catch (error) {
      console.error("Erro durante o cadastro:", error);
    }
  };

  const digitar = (e) => {
    setObjCliente({ ...objCliente, [e.target.name]: e.target.value });
    setIsBtnVisible(e.target.name === "senha_user" && e.target.value !== "");
  };

  const toggleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  //cadastrar produto
  return (
    <>
      <Sidebar page="Cadastrar cliente" />
      <ToastContainer />
      <section className="Main-cadC">
        <form className="Form-cadC">
          <div className="input-cadC">
            <Input
              placeholder="Nome do cliente"
              label="Nome do cliente"
              name="nome_user"
              maxLength={99}
              eventoTeclado={digitar}
              obj={objCliente.nome_user}
            />
          </div>
          <div className="input-cadC">
            <Input
              className="input-cadC"
              placeholder="Email"
              name="email_user"
              label="Email"
              maxLength={99}
              eventoTeclado={digitar}
              obj={objCliente.email_user}
            />
          </div>
          <div className="input-cadC">
            <Input
              className="input-cadC"
              placeholder="Login"
              name="login"
              maxLength={49}
              label="Login"
              eventoTeclado={digitar}
              obj={objCliente.login}
            />
          </div>
          <div className="input-cadC">
            <Input
              className="input-cadC"
              placeholder="Senha"
              name="senha_user"
              label="Senha"
              maxLength={49}
              type={mostrarSenha ? "text" : "password"}
              eventoTeclado={digitar}
              obj={objCliente.senha_user}
            />
            <button
              type="button"
              onClick={toggleMostrarSenha}
              className={`vision-cad ${isBtnVisible ? "" : "close-btn"}`}
            >
              <span>{mostrarSenha ? "Esconder Senha" : "Mostrar Senha"}</span>
            </button>
          </div>
          <div className="input-cadC">
            <select
              id="selectPasta"
              name="pastaCliente"
              value={objCliente.pastaCliente}
              onChange={(e) => {
                const selectedPasta = pastas.find(pasta => pasta.name === e.target.value);
                setObjCliente({ ...objCliente, pastaCliente: selectedPasta ? selectedPasta.name : "" });
              }}
            >
              <option value="">Selecione uma pasta</option>
              {pastas.map((pasta) => (
                <option key={pasta.name} value={pasta.name}>
                  {pasta.name}
                </option>
              ))}
            </select>
          </div>
          <div className="button">
            <Button nome="Cadastrar" classname="Cadastrar" funcao={cadastrar} />
          </div>
        </form>
      </section>
    </>
  );
};

export { CadClienteEmp };