import "./style.css";


const ListaReset = ( {vetor, funcao}) => {

  return (
<>

<link href="https://cdn.jsdelivr.net/npm/boxicons@2.1.0/css/boxicons.min.css" rel="stylesheet" />
{vetor.map((cliente) => (
  <div class="card-reset" key={cliente.idUser}>
  <div class="icon-card">
        <i class='bx bxs-shield-x'></i>
        </div>
        <div class="content-card">
            <span class="title-card">Alteração de senha!</span>
            <div class="desc"><b className="nome">{cliente.nomeUser}</b> solicitou uma alteração de senha</div> 
            <div class="actions">
                <div>
                    <button onClick={() => funcao(cliente.login)} class="Alterar">Alterar</button>
                </div>
                <div>
                    <a href="#" class="Cancelar">Cancelar</a> 
                </div>
            </div>    
        </div>
        
        </div>
        ))}
</>
  );
};

export default ListaReset;