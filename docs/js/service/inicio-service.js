'use strict'

// Importamos funcion desde cargar-datos.js
import { cargarJSON } from '../data/cargar-datos.js';

// Creamos constante con la ruta al archivo JSON
const RUTA_JSON = 'js/data/usuarios.json';

// Un array vacio para almacenar los usuarios
let datosJSON = [];

// Usamos la funcion para almacenar en localStorage los usuarios de nuestro usuarios.JSON
cargarJSON(RUTA_JSON, (datos) => {
    datosJSON = datos;
    localStorage.setItem('listaUsuarios', JSON.stringify(datosJSON));
});

// Creamos funcion para verificar usuario y contraseña
export function verificarDatos(userIntrod, contraIntrod) {
    let validarCon = /^[a-zA-Z0-9]+$/; // Creamos una RegExp para validar las contraseñas
    if (!validarCon.test(contraIntrod)) {
        return false;
    }

    // Parsear los datos para poder recorrerlos
    const textoUsuarios = localStorage.getItem('listaUsuarios');
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