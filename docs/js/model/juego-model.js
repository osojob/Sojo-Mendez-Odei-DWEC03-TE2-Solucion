'use strict'

// Creamos constante NIVELES para almacenar los datos relevantes del minijuego
export const NIVELES = {
    facil: { baldosas: 3, tiempo: 30, longitud: 6},
    intermedio: { baldosas: 5, tiempo: 25, longitud: 5},
    avanzado: { baldosas: 7, tiempo: 20, longitud: 5}
}

// Funcion que genera la secuencia de cada nivel
export function generarSecuencia(longitud, numBaldosas) {
    // Creamos un array para almacenar la secuencia
    const secuencia = [];
    
    // Hacemos un bucle que recorra hasta el ultimo numero de la longitud de baldosas
    for (let i = 0; i < longitud; i++) {
        const numRandom = Math.floor(Math.random() * numBaldosas); // Generamos un numero, no decimal que sea entre 0 y el numero max (longitud)
        secuencia.push(numRandom);
    }

    return secuencia;
}

// Funcion para calcular la medalla
export function calcularMedalla(fallos) {
    // If-Else para determinar que medalla se consigue
    if (fallos === 0) {
        return 'oro';
    } else if (fallos === 1) {
        return 'plata';
    } else if (fallos === 2 || fallos === 3) {
        return 'bronce';
    } else {
        return 'derrota';
    }
}

// Funcion encargada de comprobar si el jugador ha pulsado la baldosa correcta
export function comprobarPulsacion(secuencia, posicionActual, indicePulsado) {
    return secuencia[posicionActual] === indicePulsado;
}

// Funcion para crear un estado inicial para el jugador
export function crearEstadoInicial(nivel) {
    const config = NIVELES[nivel]; // Almacenamos la configuracion, dependiendo del nivel
    const secuencia = generarSecuencia(config.longitud, config.baldosas); // Almacenamos la secuencia generada (longitud + num de baldosas)

    return { // Nos devuelve un 'objeto' pero en estado default
        nivel: nivel,
        fallos: 0,
        rondaActual: 0,
        posicionActual: 0,
        secuencia: secuencia,
        tiempoRestante: config.tiempo
    };
}