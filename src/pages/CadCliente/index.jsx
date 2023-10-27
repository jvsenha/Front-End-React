import "./style.css"
import Sidebar from "../../components/Sidebar"
import Input from '../../components/Input'
import Button from '../../components/Button';
import { useState } from "react";
const CadClienteEmp = () => {
    //Objeto cliente
    const cliente = {
        idCliente: 0,
        nomeUser: "",
        login: "",
        senhaUser: "",
        pastaCliente: "",
        emailCliente: "",
        role: "USER",
        isEnabled:"true"
    }
    const [objCliente, setObjCliente] = useState(cliente);


    const limparform = () => {
        setObjCliente(cliente)
    }

    // dados dos formularios
    const cadastrar = () => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:8080/auth/cadastrar', {
            method: 'POST',
            body: JSON.stringify(objCliente),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(retorno => retorno.json())
            .then(retorno_convert => {
                if (retorno_convert.message !== undefined) {
                    alert(retorno_convert.message)
                } else {
                    alert('cliente Cadastrado com sucesso!!')
                    limparform();
                }


            })
    }

    const digitar = (e) => {
        setObjCliente({ ...objCliente, [e.target.name]: e.target.value });
    }


    //cadastrar produto
    return (
        <>

            <Sidebar page="Cadastrar cliente" />

            <section className="Main-listC">
                <form className="Form">
                    <div className="input-cadC">
                        <Input placeholder="Nome do cliente" label="Nome do cliente" name="nomeUser" eventoTeclado={digitar} obj={objCliente.nomeUser} />
                    </div>
                    <div className="input-cadC">
                        <Input className="input-cadC" placeholder="Email" name="emailCliente" label="Email" eventoTeclado={digitar} obj={objCliente.emailCliente} />

                    </div>
                    <div className="input-cadC">
                        <Input className="input-cadC" placeholder="Login" name="login" label="Login" eventoTeclado={digitar} obj={objCliente.login} />

                    </div>
                    <div className="input-cadC">
                        <Input className="input-cadC" placeholder="Senha" name="senhaUser" label="Senha" eventoTeclado={digitar} obj={objCliente.senhaUser} />

                    </div>
                    <div className="input-cadC">
                        <Input className="input-cadC" placeholder="Pasta" label="Pasta" name="pastaCliente" eventoTeclado={digitar} obj={objCliente.pastaCliente} />
                    </div>
                    <div className="button">
                        <Button nome="Cadastrar" classname="Cadastrar" funcao={cadastrar} />
                    </div>
                </form>

            </section>

        </>
    )
}

export { CadClienteEmp };