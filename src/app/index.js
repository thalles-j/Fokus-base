const musica = new Audio('/src/assets/sound/luna-rise-part-one.mp3');
const audioPlay = new Audio('/src/assets/sound/play.wav');
const audioPausa = new Audio('/src/assets/sound/pause.mp3');
const audioTempoFinalizado = new Audio('/src/assets/sound/beep.mp3');
let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;

// ELEMENTOS DO DOM
const musicaFocoInput = document.querySelector('#alternar-musica');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iniciarOuPausarBtIcone = document.querySelector(".app__card-primary-butto-icon");
const tempoNoTitle = document.querySelector('title')
const tempoNaTela = document.querySelector('#timer');
const html = document.querySelector('html');
const body = document.querySelector('body')

// FUNÇÕES DE ÁUDIO
musicaFocoInput.addEventListener('change', () => {
    musica.paused ? musica.play() : musica.pause();
});

// ALTERAR CONTEXTO (FOCO/DESCANSO CURTO/LONGO)
focoBt.addEventListener('click', () => {
    zerar();
    alterarContexto('foco', 1500);
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => {
    zerar();
    alterarContexto('descanso-curto', 300);
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
    zerar();
    alterarContexto('descanso-longo', 900);
    longoBt.classList.add('active');
});

function alterarContexto(contexto, tempo) {
    botoes.forEach(btn => btn.classList.remove('active'));
    tempoDecorridoEmSegundos = tempo;

    // Aplica a transição (como antes)
  
    body.classList.add('hidden')
    
    setTimeout(() => {
        // Muda o conteúdo após o tempo da transição
        html.setAttribute('data-contexto', contexto);
        banner.setAttribute('src', `/src/assets/img/${contexto}.png`);
        atualizarTitulo(contexto);

        // Remove a classe hidden para mostrar novamente
        body.classList.remove('hidden')
    }, 300); // Tempo da transição de 0.5 segundos

    mostrarTempo();


}

function atualizarTitulo(contexto) {
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície.<br><strong class="app__title-strong">Faça uma pausa longa.</strong>`;
            break;
        default:
            break;
    }
}

// TIMER
let ciclosCompletos = 0;
const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        audioTempoFinalizado.play(); // Som quando o tempo acaba

        if (html.getAttribute('data-contexto') === 'foco') {
            ciclosCompletos++; // Incrementa o contador de ciclos
            if (ciclosCompletos % 2 === 0) {
                // A cada dois ciclos de foco, vai para descanso longo
                alterarContexto('descanso-longo', 900); // 15 minutos (900 segundos)
            } else {
                // Se não for o segundo ciclo, vai para descanso curto
                alterarContexto('descanso-curto', 300); // 5 minutos (300 segundos)
            }
        } else if (html.getAttribute('data-contexto') === 'descanso-curto') {
            // Após o descanso curto, volta para foco
            alterarContexto('foco', 1500); // 25 minutos (1500 segundos)
        } else if (html.getAttribute('data-contexto') === 'descanso-longo') {
            // Após o descanso longo, volta para foco e reinicia o ciclo
            alterarContexto('foco', 1500); // 25 minutos (1500 segundos)
        }

        zerar(); // Para o temporizador atual
        return;
    }

    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
};

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        audioPausa.play();
        zerar();
    } else {
        audioPlay.play();
        intervaloId = setInterval(contagemRegressiva, 1000);
        iniciarOuPausarBt.textContent = "Pausar";
        iniciarOuPausarBtIcone.setAttribute('src', `/src/assets/img/pause.png`);
    }
}

function zerar() {
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = "Começar";
    iniciarOuPausarBtIcone.setAttribute('src', `/src/assets/img/play_arrow.png`);
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', { minute: '2-digit', second: '2-digit' });
    tempoNaTela.innerHTML = `${tempoFormatado}`;
    tempoNoTitle.textContent = " Fokus - " + tempoFormatado
}

mostrarTempo();
