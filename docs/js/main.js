'use strict'

import { iniciarLogin } from './service/inicio-service.js';
import { iniciarBienvenida } from './service/bienvenida-service.js'; // Importamos la funcion para iniciar la seleccion de bienvenida.html
import { iniciarJuego } from './service/juego-service.js'

/* --- Página: INDEX (login) --- */
if (document.getElementById('form-login')) {
    // Hacemos llamada a la funcion de iniciar login
    iniciarLogin();
}

/* --- Página: BIENVENIDA (instrucciones) */
if (document.querySelector('.boton-dific')) {
    // Hacemos llamada a la funcion de bienvenida
    iniciarBienvenida();
}

/* -- Página: JUEGO (tablero) */
if (document.getElementById('texto-nivel')) {
    // Hacemos llamada a la funcion de juego
    iniciarJuego();
}