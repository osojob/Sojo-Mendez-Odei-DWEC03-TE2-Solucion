'use strict'

import { iniciarLogin } from './service/inicio-service.js';
import { iniciarBienvenida } from './service/bienvenida-service.js'; // Importamos la funcion para iniciar la seleccion de bienvenida.html

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