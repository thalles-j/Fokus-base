import { alterarContexto } from './changeContext.js';

const musicInput = document.querySelector('#alternar-musica')
const music = new Audio('src/assets/sound/luna-rise-part-one.mp3')
music.loop = true
music.volume = 0.2;

musicInput.addEventListener('change', () => {
    if(music.paused) {
        music.play();
    } else {
        music.pause();
    }
})

//BOTOES DE TEMPOS
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



// TIMER
let tempDecorridoEmSegundos = 2500; 
let intervaloId = null; 
const startBtn = document.querySelector('#start-pause'); 
const starOrPauseBtn = document.querySelector('#start-pause span');
const imgPause = document.querySelector('#imgTime');
const audioPause = new Audio('/src/assets/sound/pause.mp3'); 
const audioInicar = new Audio('/src/assets/sound/play.wav');
const audioTimer = new Audio('src/assets/sound/beep.mp3');
const timeHtml = document.querySelector('#timer')

const contagemRegressiva = () => {
    if (tempDecorridoEmSegundos <= 0) {
         // Som quando o tempo acaba
        audioTimer.volume = 0.3;
        audioTimer.play();
        zerar();
        return;
    }
    tempDecorridoEmSegundos -= 1; 
    mostrarTempo()
    console.log('Temporizador: ' + tempDecorridoEmSegundos); 
};

startBtn.addEventListener('click', startPause); 

function startPause() {
    if (intervaloId) {
        // Se já está rodando, apenas pausar
        audioPause.volume = 0.3;
        audioPause.play();
        clearInterval(intervaloId); 
        intervaloId = null;
        starOrPauseBtn.textContent = 'Continuar';
        imgPause.setAttribute('src', 'src/assets/img/play_arrow.png'); 
        return;
    }
    // Se não está rodando, iniciar ou continuar
    audioInicar.volume = 0.3;
    audioInicar.play();
    intervaloId = setInterval(contagemRegressiva, 1000); 
    starOrPauseBtn.textContent = 'Pausar';
    imgPause.setAttribute('src', 'src/assets/img/pause.png'); 
}

function zerar() {
    clearInterval(intervaloId); // Limpar o intervalo
    tempDecorridoEmSegundos = 5; 
    imgPause.setAttribute('src', 'src/assets/img/play_arrow.png');  
    starOrPauseBtn.textContent = 'Começar';
    intervaloId = null;
    mostrarTempo();
}

function mostrarTempo() {
    const timer = tempDecorridoEmSegundos;
    timeHtml.innerHTML = `${timer}`;
}
mostrarTempo()

// const timer = new Date(tempDecorridoEmSegundos * 1000)
// const timerFomated = timer.toLocaleDateString.