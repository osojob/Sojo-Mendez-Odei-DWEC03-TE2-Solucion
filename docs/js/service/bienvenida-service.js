'use strict'

// Funcion para redirigir y almacenar el modo que el jugador ha elegido
export function iniciarBienvenida() {
    const btnFacil = document.getElementById('boton-facil');
    const btnIntermedio = document.getElementById('boton-inter');
    const btnAvanzado = document.getElementById('boton-avan');

    btnFacil.addEventListener('click', () => irA('facil'));
    btnIntermedio.addEventListener('click', () => irA('intermedio'));
    btnAvanzado.addEventListener('click', () => irA('avanzado'));
}

// Funcion para redirigir al lvl
function irA(nivel) {
    sessionStorage.setItem('nivel', nivel); // Almacenamos en el sessionStorage el nivel
    
    // Por si el usuario vuelve a jugar, limpiamos los restos de las partidas anteriores
    sessionStorage.removeItem('secuencia');
    sessionStorage.removeItem('fallos');
    sessionStorage.removeItem('rondaActual');
    sessionStorage.removeItem('puntuacion');
    sessionStorage.removeItem('tiempoRestante');
    sessionStorage.removeItem('resultado');

    // Redirigimos al juego, dependiendo de lo seleccionado
    window.location.href = 'juego.html';
}