import Sidebar from "../../components/Sidebar";
import Search from "../../components/Search"
import Tabledoc from "../../components/Tabela-doc"
import "../../assets/style.css"
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
        const resultado = window.confirm("Você tem certeza que deseja continuar?");
        if (resultado === true) {
            console.log(`Tentando excluir arquivo com fileId: ${idDocumento}`);
    
            // Primeiro, tente excluir o documento do banco de dados
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
                    
                        // Se a exclusão do banco de dados for bem-sucedida, prossiga para excluir o arquivo do Google Drive
                        fetch(`http://localhost:8000/deletar/${idDocumento}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-type': 'application/json',
                                'Accept': 'application/json',
                            }
                        })
                            .then(retorno => retorno.json())
                            .then(retorno_convert => {
                                alert(retorno_convert.message);
                                // Atualize a lista de arquivos após a exclusão bem-sucedida
                                setArquivos(retorno_convert.arquivos);
                            })
                            .catch(error => {
                                console.error('Erro ao excluir arquivo do Google Drive:', error);
                                // Trate o erro, se necessário
                            });
                    
                })
                .catch(error => {
                    console.error('Erro ao excluir arquivo do banco de dados:', error);
                    // Trate o erro, se necessário
                });
        } else {
            alert("Ação cancelada!!");
        }
    };
    
    

    const [busca, setBusca] = useState('');

    const ArquivosFiltrados = useMemo(() => {
        const lowerBusca = busca.toLowerCase().trim();
        return arquivos.filter(
            (arquivo) =>
                arquivo.usuario.nomeUser.toLowerCase().trim().includes(lowerBusca) ||
                arquivo.nomeDocumento.toLowerCase().trim().includes(lowerBusca)

        );
    }, [busca, arquivos]);

    const downloadFile = async (fileId, nomeDocumento) => {
        try {
            const response = await fetch(`http://localhost:8000/download/${fileId}/${nomeDocumento}`, {
                method: 'GET',
            });


            if (response.ok) {
                // Aqui você pode tratar a resposta, como salvar o arquivo ou exibir uma mensagem ao usuário
                // No exemplo abaixo, estamos salvando o arquivo com o nome fornecido pelo servidor
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = nomeDocumento; // Use o nome do arquivo fornecido
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            } else {
                console.error('Erro ao baixar o arquivo:', response.statusText);
                // Aqui você pode tratar o erro, como exibir uma mensagem de erro ao usuário
            }
        } catch (error) {
            console.error('Erro ao baixar o arquivo:', error);
            // Trate erros de rede ou exceções aqui, se necessário
        }
    };






    return (
        <>
            <section className='listcliente'>
                <Sidebar page="Lista de Arquivos" />

                <section className="Main-listC">
                    <section className="header-listC">
                        <h1 className="Title">
                            Arquivo
                        </h1>

                        <Search funcao={(ev) => setBusca(ev.target.value)} value={busca} />

                    </section>
                    <section className="table">
                        <Tabledoc vetor={ArquivosFiltrados}
                            onRemover={remover}
                            onDownload={downloadFile} />

                    </section>


                </section>

            </section>


        </>
    )
}

export { ListArquivosEmp }

