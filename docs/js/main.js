'use strict'

import { verificarDatos } from './service/inicio-service.js'; // Importamos la funcion creada para verificar los datos que introduzcamos

const formulario = document.getElementById('form-login'); // Recogemos el formulario del index
const error = document.getElementById('mensaje-error'); // Recogemos el error del index

// Creamos un event listener para que cuando pulsemos el botón enviar, se ejecute el codigo
formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const usuario = document.getElementById('usuario').value; // Almacenamos el valor del input usuario del HTML
    const contrasena = document.getElementById('contra').value; // Almacenamos el valor del input contra del HTML
    const userValido = verificarDatos(usuario, contrasena); // Creamos una constate que almacena la funcion que va a verificar los usuarios

    if (userValido) { // Si el usuario cumple el RegEx y además existe
        error.classList.add('hidden'); // Si encontramos el usuario, añadimos la clase .hidden en el HTML para que no muestre el error
        window.location.href = './pages/bienvenida.html'; // Redirigimos la página a la de la bienvenida
    } else { // Si da false...
        error.classList.remove('hidden'); // Si no encontramos el usuario, salta el error, quitandole la clase .hidden para que se muestre
    }
});