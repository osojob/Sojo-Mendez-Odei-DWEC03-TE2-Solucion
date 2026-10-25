'use strict'

// Importamos funcion desde cargar-datos.js
import { cargarJSON } from '../data/cargar-datos.js';

// Creamos constante con la ruta al archivo JSON
const RUTA_JSON = 'js/data/usuarios.json';

// Un array vacio para almacenar los usuarios
let datosJSON = [];

// Creamos funcion para iniciar el script del login
export function iniciarLogin() {
    // Usamos la funcion para almacenar en localStorage los usuarios de nuestro usuarios.JSON
    cargarJSON(RUTA_JSON, (datos) => {
        datosJSON = datos;
        localStorage.setItem('listaUsuarios', JSON.stringify(datosJSON));
    });

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
}

// Creamos funcion para verificar usuario y contraseña
export function verificarDatos(userIntrod, contraIntrod) {
    const validarCon = /^[a-zA-Z0-9]+$/; // Creamos una RegExp para validar las contraseñas
    if (!validarCon.test(contraIntrod)) {
        return false;
    }

    // Parsear los datos para poder recorrerlos
    const textoUsuarios = localStorage.getItem('listaUsuarios');
    if (!textoUsuarios) return false; // Por si no se carga el JSON antes de tiempo y de false para mostrar el error
    const lista = JSON.parse(textoUsuarios);

    // Recorremos la lista con un for
    for (let i = 0; i < lista.length; i++) {
        let usuarioActual = lista[i];
        // Si coinciden user y contraseña, nos da true
        if (usuarioActual.usuario === userIntrod && usuarioActual.contraseña === contraIntrod) {
            return true;
        }
    }

    return false;
}