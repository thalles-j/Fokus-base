import { alterarContexto } from './alterarContexto.js';


const btnAll = document.querySelectorAll('.app__card-button');

let ultimoClick = null;

btnAll.forEach(btn => btn.addEventListener('click', (e) => {
    // Pega o valor do atributo data-contexto do botão clicado
    const btnContexto = btn.getAttribute('data-contexto');
    
    if(ultimoClick){
        ultimoClick.classList.remove('active');
    }
    btn.classList.add('active');
        
    ultimoClick = btn;
    alterarContexto(btnContexto)
   
    
}));