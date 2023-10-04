import { Form, Link } from "react-router-dom";
import { Container, Content, Main_content, FormLogin } from "./style";
import Input from '../../components/Input'
import Button from '../../components/Button';
import Logo from "../../assets/Imagens/logotipo_grupo_engerb_base_site_branca.webp";
const Home = () => {




    return (
        <>
            <body>
                <Container>
                    <Content >
                        <Main_content >
                            <h1>
                                Fazer login
                            </h1>
                            <FormLogin>
                                <Input placeholder="Name" label="Name" />
                                <Input placeholder="Senha" label="Senha" />
                            </FormLogin>

                            <Button nome="entrar" classname="Button" />
                        </Main_content >

                    </Content>
                    <Content $dark>
                    <img src={Logo} alt="" />

                    </Content>
                </Container>

            </body>

        </>
    );
}

export { Home };

// <Link to="/login"> Fazer login</Link> 