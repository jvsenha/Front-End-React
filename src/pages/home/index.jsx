import "./style.css";
import Input from '../../components/Input'
import Button from '../../components/Button';
import Logo from "../../assets/Imagens/logotipo_grupo_engerb_base_site_branca.webp";
import { useState } from "react";
const Home = () => {

    const Credeciais = {
        login: "",
        senhaUser: "",
    }
    const [objCredeciais, setObjCredeciais] = useState(Credeciais);

    const logar = () => {
        fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            body: JSON.stringify(objCredeciais),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(retorno => retorno.json())
            .then(retorno_convert => {
                if (retorno_convert.mensagem !== undefined) {
                    alert(retorno_convert.mensagem)
                } else {
                    window.location.assign("http://localhost:3000/homeemp")
                }

            })
    }

    const digitar = (e) => {
        setObjCredeciais({ ...objCredeciais, [e.target.name]: e.target.value });
    }


return (
    <>
        <body>
            <section className="Container">
                <section className="Content" >
                    <div className="Main_content" >
                        <h1>
                            Fazer login
                        </h1>
                        <form className="FormLogin">
                        <Input className="input-cad" placeholder="Nome de Usuario" name="login" label="Nome de Usuario" eventoTeclado={digitar} />
                            <Input className="input-cad" placeholder="Senha" name="senhaUser" label="Senha" eventoTeclado={digitar} />
                        </form>

                        <Button nome="Entrar" classname="Button" funcao={logar} />
                    </div >

                </section>
                <section className="Content dark">
                    <img src={Logo} alt="" />

                </section>
            </section>

        </body>

    </>
);
}

export { Home };

// <Link to="/login"> Fazer login</Link> 