'use strict'

import { comprobarPulsacion, crearEstadoInicial, NIVELES } from "../model/juego-model.js"

// Funcion para iniciar juego
export function iniciarJuego() {

    // Creamos objeto para almacenar los sonidos de cada baldosa
    const SONIDOS = {
        azul: new Audio('../mp3/do.mp3'),
        rojo: new Audio('../mp3/re.mp3'),
        verde: new Audio('../mp3/mi.mp3'),
        amarillo: new Audio('../mp3/fa.mp3'),
        magenta: new Audio('../mp3/sol.mp3'),
        cian: new Audio('../mp3/la.mp3'),
        naranja: new Audio('../mp3/si.mp3')
        
    };

    // Leemos el nivel al que el jugador ha entrado
    const nivel = sessionStorage.getItem('nivel');

    // Creamos el estado inicial default
    const estado = crearEstadoInicial(nivel);

    // Guardamos el estado como JSON en el sessionStorage
    sessionStorage.setItem('estado', JSON.stringify(estado));

    // Actualizamos también el titulo del modo, dependiendo de lo seleccionado
    const titulo = document.getElementById('texto-nivel');

    // Creamos variables
    let tablero;
    let mostrandoSecuencia = true;
    let intervalo;

    // Mostramos el tablero correcto dependiendo de lo elegido
    if (nivel === 'facil') {
        tablero = document.getElementById('tablero-facil');
        titulo.textContent = 'Modo fácil';
    } else if (nivel === 'intermedio') {
        tablero = document.getElementById('tablero-intermedio');
        titulo.textContent = 'Modo intermedio';
    } else if (nivel === 'avanzado') {
        tablero = document.getElementById('tablero-avanzado');
        titulo.textContent = 'Modo avanzado';
    }

    // Mostramos el tablero quitandole la clase
    tablero.classList.remove('container-oculto');

    // Seleccionamos las baldosas
    const baldosas = tablero.querySelectorAll('.baldosa');

    // Recorremos y añadimos listeners con un forEach para las baldosas
    baldosas.forEach((baldosa, i) => {
        baldosa.indice = i;
        baldosa.color = baldosa.classList[1]; // Asignamos la clase de color asociada con el sonido

        // Evento que se encarga de tener en cuenta si el raton ha entrado en la baldosa
        baldosa.addEventListener('mouseenter', () => {
            baldosa.classList.add('hover'); // Si entra en la baldosa, se añade el hover
        });

        // Evento que se encarga de tener en cuenta si se ha presionado la baldosa
        baldosa.addEventListener('mousedown', () => {
            if (mostrandoSecuencia) return; // Bloqueamos para que cuando se este mostrando, el jugador no pueda pulsar baldosas
            SONIDOS[baldosa.color].volume = 0.3;
            SONIDOS[baldosa.color].currentTime = 0;
            SONIDOS[baldosa.color].play(); // Se reproduce el sonido al pulsar la baldosa

            const indicePulsado = baldosa.indice;
            const acierto = comprobarPulsacion(estado.secuencia, estado.posicionActual, indicePulsado);

            if (acierto) {
                // Si se acierta, avanzamos la posición en la secuencia
                estado.posicionActual++;

                if (estado.posicionActual === estado.rondaActual + 1) {
                    estado.rondaActual++;
                    estado.posicionActual = 0;

                    // Guardamos en el sessionStorage el estado que se va actualizando
                    sessionStorage.setItem('estado', JSON.stringify(estado));

                    // Actualizamos la secuencia
                    if (estado.rondaActual >= estado.secuencia.length) {
                        // Pausamos el cronometro
                        clearInterval(intervalo);
                        window.location.href = 'resultado.html';
                    } else {
                        mostrarSecuencia();
                    }
                }
            } else {
                // Si se falla
                estado.fallos++;
                estado.posicionActual = 0;
                
                // Si hay mas de 3 fallos
                if (estado.fallos >= 4) {
                    // Game over, nos manda a la pagina de resultados
                    sessionStorage.setItem('estado', JSON.stringify(estado));
                    window.location.href = 'resultado.html'
                } else {
                    // Marcamos la vida con una x cada vez que se falla
                    const corazones = document.querySelectorAll('.container-corazon');
                    corazones[estado.fallos - 1].classList.add('fallado');

                    // Feedback visual que ilumina la baldosa en rojo si nos equivocamos
                    baldosa.classList.add('error');

                    // Después quitamos el rojo para que repita la secuencia
                    setTimeout(() => {
                        baldosa.classList.remove('error');
                        mostrarSecuencia();
                    }, 250);
                }
            }

            // Actualizamos en el sessionStorage la posicionActual
            sessionStorage.setItem('estado', JSON.stringify(estado));
        });

        // Evento que se encarga de tener en cuenta en cuanto el raton haya salido de la baldosa
        baldosa.addEventListener('mouseleave', () => {
            baldosa.classList.remove('hover'); // Si se sale de la baldosa, se quita el hover
        });
    });

    // Inicialiamos el cronómetro
    document.getElementById('cronometro').textContent = estado.tiempoRestante;

    // Creamos la funcion para mostrar la secuencia en el tablero
    function mostrarSecuencia() {
        mostrandoSecuencia = true;
        const config = NIVELES[estado.nivel]; // Se accede al nivel que estamos
        const notas = estado.rondaActual + 1; // Establecemos cuantas notas vamos a mostrar

        // Envolvemos para dar un margen entre secuencias
        setTimeout(() => {
            
            for (let i = 0; i < notas; i++) {
                const nota = estado.secuencia[i];
                const baldosa = encontrarBaldosa(nota);
                const tiempo = i * config.velocidad; // El tiempo entre nota y nota, dependiendo de la dificultad

                // Para iluminar la baldosa
                setTimeout(() => {
                    baldosa.classList.add('activa'); // Se activa la baldosa
                    SONIDOS[baldosa.color].volume = 0.7; // Bajamos volumen
                    SONIDOS[baldosa.color].currentTime = 0; // Reiniciar el sonido
                    SONIDOS[baldosa.color].play(); // Se reproduce el sonido
                }, tiempo);

                // Para apagar la baldosa
                setTimeout(() => {
                    baldosa.classList.remove('activa');
                }, tiempo + 250);
            }

            // Desbloquear que el jugador pueda seguir pulsando las baldosas
            setTimeout(() => {
                mostrandoSecuencia = false;
            }, notas * config.velocidad + 250);

        }, 300);
    }

    // Creamos una funcion para encontrar la baldosa que se tiene que pulsar
    function encontrarBaldosa(nota) {
        for (let i = 0; i < baldosas.length; i++) {
            if (baldosas[i].indice === nota) {
                return baldosas[i];
            }
        }
        return null;
    }

    // Almacenamos el botón de empezar
    const botonEmpezar = document.querySelector('.boton-juego');

    // Funcion encargada de empezar la partida al pulsar el botón
    function empezarPartida() {
        // Para evitar que se pueda pulsar dos veces el botón
        botonEmpezar.disabled = true;

        // Creamos el cronómetro
        intervalo = setInterval(() => {
            estado.tiempoRestante--;
            document.getElementById('cronometro').textContent = estado.tiempoRestante; // Ponemos el cronometro en el tablero
            sessionStorage.setItem('estado', JSON.stringify(estado));

            // Si el cronómetro llega a 0, nos redirije a la página de resultados (derrota)
            if (estado.tiempoRestante <= 0) {
                clearInterval(intervalo);
                window.location.href = 'resultado.html';
            }
        }, 1000);

        mostrarSecuencia();
    }

    // Creamos un nuevo evento para que el juego empiece al pulsar el botón
    botonEmpezar.addEventListener('click', empezarPartida);
}