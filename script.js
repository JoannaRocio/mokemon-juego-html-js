const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const sectionReiniciar = document.getElementById('reiniciar');
const botonMascotaJugador = document.getElementById('boton-mascota');
const botonReiniciar = document.getElementById('boton-reiniciar');
sectionReiniciar.style.display = 'none'

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');

const spanMascotaJugador = document.getElementById('mascota-jugador');
const spanMascotaEnemigo = document.getElementById('mascota-enemigo');

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado');
const ataquesDelJugador = document.getElementById('ataques-del-jugador');
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo');

const contenedorTarjetas = document.getElementById('contenedorTarjetas');

const contenedorAtaques = document.getElementById('contenedorAtaques');

let mokemones = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionDeMokemones;

let inputPaltamon;
let inputWatemon;
let inputFuemon;

let mascotaJugador;
let ataquesMokemon;
let ataquesMokemonEnemigo;

let botonAgua;
let botonFuego;
let botonTierra;
let botones = [];

let indexAtaqueJugador;
let indexAtaqueEnemigo;

let victoriasJugador = 0;
let victoriasEnemigo = 0 ;

let vidasJugador = 3;
let vidasEnemigo = 3;

class Mokemon {
    constructor(nombre, foto, vida) {
        this.nombre =  nombre;
        this.foto = foto,
        this.vida = vida,
        this.ataques = [];
    }
}

let paltamon = new Mokemon('Paltamon', './assets/paltamon.png', 5);

let watemon = new Mokemon('Watemon', './assets/watemon.png', 5);

let fuemon = new Mokemon('Fuemon', './assets/fuemon.png', 5);

watemon.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱' , id: 'boton-tierra'},
    { nombre: '🔥', id: 'boton-fuego'}
);

paltamon.ataques.push(
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧' , id: 'boton-agua'},
    { nombre: '🔥', id: 'boton-fuego'}
);

fuemon.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧' , id: 'boton-agua'},
    { nombre: '🌱', id: 'boton-tierra'}
);

mokemones.push(paltamon, watemon, fuemon);

function iniciarJuego() {

    sectionSeleccionarAtaque.style.display = 'none';

    mokemones.forEach((mokemon) => {
        opcionDeMokemones = `
        <input type="radio" name="mascota" id="${mokemon.nombre}"/>
        <label class="tarjetas-mokemon" for="${mokemon.nombre}">
            <p>${mokemon.nombre}</p>
            <img src="${mokemon.foto}" alt="${mokemon.nombre}">    
        </label>
        `

        contenedorTarjetas.innerHTML += opcionDeMokemones;

        inputPaltamon = document.getElementById('Paltamon');
        inputWatemon = document.getElementById('Watemon');
        inputFuemon = document.getElementById('Fuemon');
        
    });

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);

    botonReiniciar.addEventListener('click', reiniciarJuego);
}

function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none';
    sectionSeleccionarAtaque.style.display = 'flex';
    
    if (inputPaltamon.checked) {
        spanMascotaJugador.innerHTML = inputPaltamon.id;
        mascotaJugador = inputPaltamon.id;
    } else if (inputWatemon.checked) {
        spanMascotaJugador.innerHTML = inputWatemon.id;
        mascotaJugador = inputWatemon.id;
    } else if (inputFuemon.checked) {
        spanMascotaJugador.innerHTML = inputFuemon.id;
        mascotaJugador = inputFuemon.id;
    } else {
        alert('Selecciona una mascota');
    }

    extraerAtaques(mascotaJugador);
    seleccionarMascotaEnemigo();
}

function extraerAtaques(mascotaJugador) {
    let ataques;
    for (let i = 0; i < mokemones.length; i++) {
        if (mascotaJugador === mokemones[i].nombre) {
            ataques =  mokemones[i].ataques;
        }
    }
    mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokemon = `
        <button class="btn-ataque BAtaque" id="${ataque.id}"> ${ataque.nombre}
        </button>
        `
        contenedorAtaques.innerHTML += ataquesMokemon;
    })

    botonAgua = document.getElementById('boton-agua');
    botonFuego = document.getElementById('boton-fuego');
    botonTierra = document.getElementById('boton-tierra');
    botones = document.querySelectorAll('.BAtaque');
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO');
                console.log(ataqueJugador);
                boton.style.background = '#112f58';
                boton.disabled = true;   
            } else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA');
                console.log(ataqueJugador);
                boton.style.background = '#112f58';
                boton.disabled = true;  
            } else {
                ataqueJugador.push('TIERRA');
                console.log(ataqueJugador);
                boton.style.background = '#112f58';
                boton.disabled = true;
            }
            ataqueAleatorioEnemigo();
        })
    })
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, mokemones.length -1);

    spanMascotaEnemigo.innerHTML = mokemones[mascotaAleatoria].nombre;
    ataquesMokemonEnemigo = mokemones[mascotaAleatoria].ataques;
    secuenciaAtaque();
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0,ataquesMokemonEnemigo.length -1)
    
    if (ataqueAleatorio == 0 || ataqueAleatorio ==1) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo);
    iniciarPelea();
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate();
    }
}

function indexAmbosOponente(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador];
    indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function combate() {
    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponente(index, index);
            crearMensaje("EMPATE");
        } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
            indexAmbosOponente(index, index);
            crearMensaje("GANASTE");
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        } else if (ataqueJugador[index] ==='AGUA' && ataqueEnemigo[index] === 'FUEGO') {
            indexAmbosOponente(index, index);
            crearMensaje("GANASTE");
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        } else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA') {
            indexAmbosOponente(index, index);
            crearMensaje("GANASTE");
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        } else {
            indexAmbosOponente(index, index);
            crearMensaje("PERDISTE");
            victoriasEnemigo++;
            spanVidasEnemigo.innerHTML = victoriasEnemigo;
        }
    }
    revisarVidas();
}

function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("Esto fue un empate!!!")
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("FELICITACIONES! Ganaste :)")
    } else {
        crearMensajeFinal('Lo siento, perdiste :(')
    }
}

function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal;

    sectionReiniciar.style.display = 'block';
}

function reiniciarJuego() {
    location.reload();
}

window.addEventListener('load', iniciarJuego);