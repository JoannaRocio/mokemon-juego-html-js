//variables globales
let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

//primer función que se ejecuta al iniciar del juego
function iniciarJuego() {
    //desde el DOM le decimos que oculte la sección selecionar-ataque
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
    sectionSeleccionarAtaque.style.display = 'none';

    //se oculta el botón de reinicio
    let sectionReiniciar = document.getElementById('reiniciar');
    sectionReiniciar.style.display = 'none';
    
    //cuando se clickee el botón de seleccionar, se llama a la funcion seleccionarMascotaJugador 
    let botonMascotaJugador = document.getElementById('boton-mascota');
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);

    //cuando se ejecute un ataque se llaman a las funciones correspondientes
    let botonFuego = document.getElementById('boton-fuego');
    botonFuego.addEventListener('click', ataqueFuego);

    let botonAgua = document.getElementById('boton-agua');
    botonAgua.addEventListener('click', ataqueAgua);

    let botonTierra = document.getElementById('boton-tierra');
    botonTierra.addEventListener('click', ataqueTierra);

    //botón para reiniciar el juego
    let botonReiniciar = document.getElementById('boton-reiniciar');
    botonReiniciar.addEventListener('click', reiniciarJuego);
}

function seleccionarMascotaJugador() {

    //cuando se elije la mascota, se oculta la sección de seleccionar-mascota
    let sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');
    sectionSeleccionarMascota.style.display = 'none';
    
    //cuando se seleeciona una mascota se muestra la sección selecciona ataque
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
    sectionSeleccionarAtaque.style.display = 'block';
    
    //se guarda en variables los labels con los nombres
    let inputPaltamon = document.getElementById('paltamon');
    let inputWatemon = document.getElementById('watemon');
    let inputFuemon = document.getElementById('fuemon');
    let spanMascotaJugador = document.getElementById('mascota-jugador');
    
    //dependiendo del radiobutton elegido, se guarda el nombre de la mascota con innerHTML que lee el texto que haya dentro del label y muestra el nombre elegido en el span mascota-jugador

    if (inputPaltamon.checked) {
        spanMascotaJugador.innerHTML = 'Paltamon';
    } else if (inputWatemon.checked) {
        spanMascotaJugador.innerHTML = 'Watemon';
    } else if (inputFuemon.checked) {
        spanMascotaJugador.innerHTML = 'Fuemon';
    } else {
        alert('Selecciona una mascota');
    }

    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(1,3);
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo');

    if (mascotaAleatoria == 1) {
        spanMascotaEnemigo.innerHTML = 'Cocomon';
    } else if (mascotaAleatoria == 2) {
        spanMascotaEnemigo.innerHTML = 'Watemon';
    } else {
        spanMascotaEnemigo.innerHTML = 'Fuemon';
    }
}

//funciones que se ejecutan cuando se apreta el botón de ataque
function ataqueFuego() {
    ataqueJugador = 'FUEGO';
    ataqueAleatorioEnemigo();
}
function ataqueAgua() {
    ataqueJugador = 'AGUA';
    ataqueAleatorioEnemigo();
}
function ataqueTierra() {
    ataqueJugador = 'TIERRA';
    ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1,3);
    
    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'FUEGO';
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'AGUA';
    } else {
        ataqueEnemigo = 'TIERRA';
    }

    combate()
}

//funcion con cálculo para generar un número random entre 1 y 3
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function combate() {
    let spanVidasJugador = document.getElementById('vidas-jugador');
    let spanVidasEnemigo = document.getElementById('vidas-enemigo');
    
    if(ataqueEnemigo == ataqueJugador) {
        crearMensaje("EMPATE");
    } else if(ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA') {
        crearMensaje("GANASTE");
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else if(ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO') {
        crearMensaje("GANASTE");
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else if(ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA') {
        crearMensaje("GANASTE");
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else {
        crearMensaje("PERDISTE");
        vidasJugador--;
        spanVidasJugador.innerHTML = vidasJugador;
    }

    revisarVidas();
}

function revisarVidas() {
    if (vidasEnemigo == 0) {
        crearMensajeFinal("FELICITACIONES! Ganaste :)");
    } else if (vidasJugador == 0) {
        crearMensajeFinal('Lo siento, perdiste :(');
    }
}

function crearMensaje(resultado) {
    let sectionMensajes = document.getElementById('mensajes');
    
    //se crea una elemento de tipo párrafo
    let parrafo = document.createElement('p');
    parrafo.innerHTML = 'Tu mascota atacó con ' + ataqueJugador + ', las mascota del enemigo atacó con ' + ataqueEnemigo + '- ' + resultado;

    //función que le dice a la sección mensaje que muestre el párrafo que se creó.
    sectionMensajes.appendChild(parrafo);
}

function crearMensajeFinal(resultadoFinal) {
    let sectionMensajes = document.getElementById('mensajes');
    
    //en la sección mensaje ahora creamos un párrafo y muestra el mensaje final que trae del parámetro resultadoFinal
    let parrafo = document.createElement('p');
    parrafo.innerHTML = resultadoFinal;

    sectionMensajes.appendChild(parrafo);

    //se deshabilitan los botones de ataques
    let botonFuego = document.getElementById('boton-fuego');
    botonFuego.disabled = true;
    let botonAgua = document.getElementById('boton-agua');
    botonAgua.disabled = true;
    let botonTierra = document.getElementById('boton-tierra');
    botonTierra.disabled = true;

    //se muestra el botón de reinicio
    let sectionReiniciar = document.getElementById('reiniciar');
    sectionReiniciar.style.display = 'block';
}

function reiniciarJuego() {
    //objeto location se refiere al lugar donde estamos ubicados, con el método reload refresca la página.
    location.reload();
}

//este evento al terminar de cargar el html llama a la funcion IniciarJuego
window.addEventListener('load', iniciarJuego);