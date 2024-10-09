let tempDecorridoEmSegundos = 5; 
let intervaloId = null; 

const startBtn = document.querySelector('#start-pause'); 

const contagemRegressiva = () => {
    if (tempDecorridoEmSegundos <= 0) {
        zerar();
        const music = new Audio('src/assets/sound/beep.mp3'); // Som quando o tempo acaba
        music.volume = 0.3;
        music.play();
        return;
    }
    tempDecorridoEmSegundos -= 1; // Decrementar o tempo
    console.log('Temporizador: ' + tempDecorridoEmSegundos); 
    // Mostrar tempo restante
};

startBtn.addEventListener('click', startPause); 

function startPause() {
    if (intervaloId) {
        // Se já está rodando, parar
        const music = new Audio('src/assets/sound/pause.mp3'); 
        music.volume = 0.3;
        music.play();
        zerar(); 
        return;
    } else {
        // Se não está rodando, iniciar
        const music = new Audio('src/assets/sound/play.mp3');
        music.volume = 0.3;
        music.play();
        intervaloId = setInterval(contagemRegressiva, 1000); 
    }
}

function zerar() {
    clearInterval(intervaloId); // Limpar o intervalo
    intervaloId = null; 
    tempDecorridoEmSegundos = 5; 
    console.log('Temporizador zerado'); 
}
