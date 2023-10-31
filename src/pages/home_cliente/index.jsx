import { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/Navbar";
import Search from "../../components/Search";
import TabelaCliente from "../../components/TabelaCliente";
import "../../assets/style.css"


const HomeCliente = () => {
    const [arquivos, setArquivos] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            fetch('http://localhost:8080/auth/dadosUser', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(retorno => retorno.json())
                .then(retorno_convert => {
                    if (retorno_convert.message !== undefined) {
                        alert(retorno_convert.message);
                    } else {
                        const userId = retorno_convert.idUser;
                        const fetchData = async () => {
                            try {
                                const response = await fetch(`http://localhost:8080/documentos/listar/${userId}`, {
                                    method: 'GET',
                                    headers: {
                                        'Content-type': 'application/json',
                                        'Accept': 'application/json',
                                        'Authorization': `Bearer ${token}`
                                    }
                                });

                                if (response.ok) {
                                    const data = await response.json();
                                    setArquivos(data);
                                } else {
                                    console.error('Erro ao buscar documentos. Resposta HTTP não está OK.');
                                }
                            } catch (error) {
                                console.error('Erro ao buscar documentos', error);
                            }
                        };

                        fetchData();
                    }
                });
        }
    }, [token]);


    const [busca, setBusca] = useState('');

    const ArquivosFiltrados = useMemo(() => {
        const lowerBusca = busca.toLowerCase().trim();
        return arquivos.filter(
            (arquivo) =>
                arquivo.usuario.nomeUser.toLowerCase().trim().includes(lowerBusca) ||
                arquivo.nomeDocumento.toLowerCase().trim().includes(lowerBusca)

        );
    }, [busca, arquivos]);

    return (
        <>
            <Navbar></Navbar>
            <section className="main">
                <section className="section-header">

                    <h1 className="Title">
                        Arquivo
                    </h1>
                    <Search funcao={(ev) => setBusca(ev.target.value)} value={busca} />
                </section>
                <section className="table">
                    <TabelaCliente vetor={ArquivosFiltrados} />
                </section>

            </section>

        </>
    );
}

export { HomeCliente };
