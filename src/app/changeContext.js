
export function alterarContexto(contexto){
    const html = document.querySelector('html');
    const banner = document.querySelector('.app__image');
    const title = document.querySelector('.app__title');
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/src/assets/img/${contexto}.png`)
    

    let titleHTML;
    switch (contexto) {
        case "foco":
            titleHTML = `
            <h1 class="app__title">Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong></h1>`;
            break;
        case "descanso-curto":
            titleHTML = `
            <h1 class="app__title">Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong></h1>`;
            break;
        case "descanso-longo":
            titleHTML = `
            <h1 class="app__title">Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong></h1>`;
            break;
        default:
            break;
    }
    title.innerHTML = titleHTML;
}