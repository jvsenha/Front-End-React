import Sidebar from "../../components/Sidebar";
import Search from "../../components/Search"
import Tabledoc from "../../components/Tabela-doc"
import "./style.css"
import { useEffect, useState, useMemo } from "react"

const ListArquivosEmp = () => {

    //usueState cliente
    const [arquivos, setArquivos] = useState([]);
    const token = localStorage.getItem('token');

    //useEffect
    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/documentos/listar", {
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
    }, []);

    const remover = (idDocumento) => {
        fetch(`http://localhost:8080/documentos/remover/${idDocumento}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(retorno => retorno.json())
            .then(retorno_convert => {
                alert(retorno_convert.message);
                fetch("http://localhost:8080/documentos/listar", {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(retorno => retorno.json())
                    .then(retorno_convert => setArquivos(retorno_convert));
            });
    }

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
            <section className='listcliente'>
                <Sidebar page="Lista de Arquivos" />
                <section className="Main-listC">
                    <section className="header-listC">
                    <h1 className="Title-emp">
                        Arquivo
                    </h1>
                     
                        <Search funcao={(ev) => setBusca(ev.target.value)} value={busca} />

                    </section>
                    <section className="table">
                        <Tabledoc vetor={ArquivosFiltrados}
                            onRemover={remover} />

                    </section>


                </section>

            </section>


        </>
    )
}

export { ListArquivosEmp }

