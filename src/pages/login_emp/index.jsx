import "./style.css";
import Input from '../../components/Input'
import Button from '../../components/Button';
import Logo from "../../assets/Imagens/logotipo_grupo_engerb_base_site_branca.webp";
const LoginEmp = () => {
    return (
        <>
            <body>
                <section className="Container-emp">
                    <section className="Content-emp dark-emp">
                        <img src={Logo} alt="" />
                    </section>
                    <section className="Content-emp" >
                        <div className="Main_content-emp" >
                            <h1>
                                Fazer login - Empresa
                            </h1>
                            <form className="FormLogin-emp">
                                <Input placeholder="Name" label="Name" />
                                <Input placeholder="Senha" label="Senha" />
                            </form>

                            <Button nome="entrar" classname="Button-emp" />
                        </div >

                    </section>
                </section>

            </body>

        </>
    );
}

export { LoginEmp };

// <Link to="/login"> Fazer login</Link> 