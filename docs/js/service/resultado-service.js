'use strict'

import { calcularMedalla } from "../model/juego-model.js";

export function iniciarResultado() {
    // Sacamos del sessionStorage el estado almacenado del jugador
    const estado = JSON.parse(sessionStorage.getItem('estado'));
    
    // Dependiendo de lo que haya hecho el jugador, se obtendrá una medalla
    let medalla;

    // Calculamos los tipos de derrota
    if (estado.tiempoRestante <= 0) {
        medalla = 'derrota';
    } else if (estado.fallos >= 4) {
        medalla = 'derrota';
    } else {
        medalla = calcularMedalla(estado.fallos);
    }

    let bloqueMostrado; // Guardamos en la variable el bloque que se muestra

    // If/else-if para mostrar el rexto correcto en la pantalla
    if (medalla === 'oro') {
        bloqueMostrado = document.getElementById('victoria-oro');
    } else if (medalla === 'plata') {
        bloqueMostrado = document.getElementById('victoria-plata');
    } else if (medalla === 'bronce') {
        bloqueMostrado = document.getElementById('victoria-bronce');
    } else if (medalla === 'derrota') {
        // Aquí hacemos una distincion en cuanto a derrotas: si es por vidas o por tiempo
        if (estado.fallos >= 4) {
            bloqueMostrado = document.getElementById('derrota-vidas');
        } else {
            bloqueMostrado = document.getElementById('derrota-tiempo');
        }
    }

    // Le quitamos la clase para que se muestre el texto correcto
    bloqueMostrado.classList.remove('container-oculto');

    // Añadimos resumen de puntuaciones en el resultado
    const resumen = document.createElement('p');
    resumen.textContent = "Tiempo: " + estado.tiempoRestante + "s | Fallos: " + estado.fallos;
    resumen.classList.add('resumen');
    bloqueMostrado.appendChild(resumen); 

    // Almacenamos los botones en resultados para que nos redirijan
    const botonLogin = document.getElementById('boton-login');
    const botonVuelta = document.getElementById('boton-volver');
    
    botonLogin.addEventListener('click', () => {
        window.location.href = '../index.html';
    });

    botonVuelta.addEventListener('click', () => {
        window.location.href = 'bienvenida.html';
    });
}