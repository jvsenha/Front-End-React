import { Form, Link } from "react-router-dom";
import { Container, Content, Main_content, FormLogin, Img } from "./style";
import Input from '../../components/Input'
import Button from '../../components/Button';
import Logo from "../../assets/Imagens/logotipo_grupo_engerb_base_site_branca.webp";
const LoginEmp = () => {
    return (
        <>
            <body>
                <Container>
                    <Content $dark>
                    <Img  src={Logo} alt="" />

                    </Content>
                    <Content >
                        <Main_content >
                            <h1>
                                Fazer login - empresa
                            </h1>
                            <FormLogin>
                                <Input placeholder="Name" label="Name" />
                                <Input placeholder="Senha" label="Senha" />
                            </FormLogin>

                            <Button nome="entrar" classname="Button" />
                        </Main_content >

                    </Content>
                </Container>

            </body>

        </>
    );
}

export { LoginEmp };

// <Link to="/login"> Fazer login</Link> 