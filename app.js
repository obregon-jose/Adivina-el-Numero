let numeroSecreto = 0;
let maxNumero = 0;
let maxIntentos = 0;
let intentos = 0;
let nivel = 0;
let intentosGuardados;

function game(){
    buttonVisibility('numUser');
    BotonesJugando()
    buttonVisibility('nuevoJuego');
}

function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

function iniciarJuego() {
    condicionesIniciales();
    buttonVisibility('numUser');
    buttonVisibility('iniciarJuego');
    buttonVisibility('jugar');
    buttonVisibility('reiniciarNivel');
}

function condicionesIniciales(){
    nivel = 1;
    intentos = 0;
    maxNumero = 10;
    maxIntentos = 5;
    intentosGuardados = maxIntentos;
    numeroSecreto = generarNumeroSecreto();
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p', `Ingrese un número entre 1 y ${maxNumero}`);
    asignarTextoElemento('#level', `Nivel: ${nivel}`);
    asignarTextoElemento('#intentos', `Oportunidades: ${maxIntentos}`);
    document.getElementById("numUser").max = `${maxNumero}`;
}

function limpiarCaja(){
    asignarTextoElemento('#intentos', `Oportunidades: ${maxIntentos}`);
    document.querySelector('#numUser').value = '';
    let elemento = document.getElementById('intentos');
    if (maxIntentos === 1 || maxIntentos === 0) {
        elemento.style.color = 'red';
    } else if(maxIntentos > 1 && maxIntentos <= 3){
        elemento.style.color = 'orange';
    } else {
        elemento.style.color = 'initial';
    }
}

function jugar(){
    let numeroUsuario = parseInt(document.getElementById('numUser').value);
    if (!isNaN(numeroUsuario) || numeroUsuario > 0) {
        intentos++;
        let elementoHTML = document.querySelector('p');
        elementoHTML.style.color = 'white';
        if (numeroUsuario === numeroSecreto) {
            ganar();
        } 
        else {
            if (numeroUsuario > numeroSecreto) {
                asignarTextoElemento('p', 'El número secreto es menor');
            } 
            else {
                asignarTextoElemento('p', 'El número secreto es mayor');
            }
            maxIntentos -= 1;
            limpiarCaja();
            if (maxIntentos === 0) {
                perder();
            }
        }
    } 
    else {
        let elementoHTML = document.querySelector('p');
        elementoHTML.style.color = 'red';
        asignarTextoElemento('p', `Ingrese un número entre 1 y ${maxNumero}`);
    }
}

function ganar(){
    lanzarConfeti();
    asignarTextoElemento('p', `¡GANASTE! <br> Realizaste ${intentos} ${intentos === 1 ? 'intento' : 'intentos'}`);
    nivel++;
    intentos = 0;
    asignarTextoElemento('#nuevoNivel', `Siguiente Nivel`);
    BotonesJugando();
}
function perder(){
    asignarTextoElemento('p', `Perdiste. El número secreto era ${numeroSecreto}`);
    asignarTextoElemento('#intentos', `Juego terminado.`);
    BotonesSinJugar();
}

function nuevoNivel(){
    intentos = 0;
    numeroSecreto = generarNumeroSecreto();
    maxNumero += 5; //Aumentar rango
    maxIntentos = maxIntentos + 3; //Acumular y aumentar vidas
    intentosGuardados = maxIntentos;
    document.getElementById("numUser").max = `${maxNumero}`;
    asignarTextoElemento('#level', `Nivel: ${nivel}`);
    asignarTextoElemento('p', `Ingrese un número entre 1 y ${maxNumero}`);
    limpiarCaja();
    BotonesJugando();
}

function reiniciarNivel(){
    numeroSecreto = generarNumeroSecreto();
    intentos = 0;
    asignarTextoElemento('p', `Ingrese un número entre 1 y ${maxNumero}`);
    maxIntentos = intentosGuardados;
    limpiarCaja();
}
 function volverJugar(){
    condicionesIniciales();
    limpiarCaja();
    BotonesSinJugar();
 }

function generarNumeroSecreto() {
    return Math.floor(Math.random() * maxNumero) + 1;  
}

function buttonVisibility(buttonId) {
    let button = document.getElementById(buttonId);
    if (button.style.display === "none") {
        button.style.display = "block";
    } else {
        button.style.display = "none";
    }
}

function BotonesJugando() {
    buttonVisibility('jugar');
    buttonVisibility('nuevoNivel');
    buttonVisibility('reiniciarNivel');
}

function BotonesSinJugar() {
    buttonVisibility('jugar');
    buttonVisibility('reiniciarNivel');
    buttonVisibility('nuevoJuego');
    buttonVisibility('numUser');
}


function lanzarConfeti() {
    dispararConfeti();
    // setTimeout(() => dispararConfeti(), 1000);
    //setTimeout(() => dispararConfeti(), 2000);
}
function dispararConfeti() {
    const numeroDeConfetis = 400;
    const colores = ['#FFC0CB', '#FFD700', '#8A2BE2', '#00FF00', '#FF8C00', '#00BFFF'];

    for (let i = 0; i < numeroDeConfetis; i++) {
        const confeti = document.createElement('div');
        confeti.classList.add('confeti');
        confeti.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
        confeti.style.left = `${Math.random() * 100}%`;
        confeti.style.animationDuration = `${Math.random() * 3 + 3}s`;
        confeti.style.opacity = Math.random();
        confeti.style.transform = `scale(${Math.random()})`;
        confeti.style.width = `${Math.random() * 10 + 5}px`;
        confeti.style.height = confeti.style.width;

        document.getElementById('confeti-container').appendChild(confeti);

        setTimeout(() => {
            confeti.remove();
        }, confeti.style.animationDuration.replace('s', '') * 1000);
    }
}

game();