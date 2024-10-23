'use strict';

/*
 * Yutas De Lorenzo Agustin
 */


class Pista {
    constructor(nombre, duracion) {
        this.nombre = nombre;
        this.duracion = duracion;
    }
}

class Disco {
    constructor(nombre, autor, codigo, portada) {
        this.nombre = nombre;
        this.autor = autor;
        this.codigo = codigo;
        this.portada = portada;
        this.pistas = [];
    }

    agregarPista(nombre, duracion) {
        this.pistas.push(new Pista(nombre, duracion));
    }
}

let discos = [];

// Funciones validadoras
function validarNombre(nombre) {
    if (nombre === "" || nombre === null) {
        alert("ERROR - El nombre del disco no es valido.");
        return false;
    }
    return true;
}

function validarAutor(autor) {
    if (autor === "" || autor === null) {
        alert("ERROR - El nombre del autor no es valido.");
        return false;
    }
    return true;
}

function validarPista(pista) {
    if (pista === "" || pista === null) {
        alert("ERROR - El nombre de la pista no es valida.");
        return false;
    }
    return true;
}

function validarCodigo(codigo) {
    if (!codigo || isNaN(codigo)) {
        alert("ERROR - El codigo debe ser un numero.");
        return false;
    }

    if (codigo < 1 || codigo > 999) {
        alert("ERROR - El codigo debe estar entre 1 y 999.");
        return false;
    }

    for (let disco of discos) {
        if (disco.codigo === codigo) {
            alert("ERROR - El codigo ya ha sido utilizado anteriormente.");
            return false;
        }
    }
    return true;
}

function validarDuracion(duracion) {
    if (isNaN(duracion) || duracion < 0 || duracion > 7200) {
        alert("ERROR - La duración debe ser un número válido (debe ser un numero entre 0 y 7200).");
        return false;
    }
    return true;
}

function validarURL(url) {
    const regex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif)|https?:\/\/.*\/image\/.*)/i; 
    if (!regex.test(url)) {
        alert("ERROR - La URL ingresada no es válida o no es un enlace a una portada.");
        return false;
    }
    return true;
}

// Funcion para Cargar un nuevo disco
function cargar() {
    let nombre;
    do {
        nombre = prompt("Ingrese el nombre del disco:");
    } while (!validarNombre(nombre));

    let autor;
    do {
        autor = prompt("Ingrese el autor o banda del disco:");
    } while (!validarAutor(autor));

    let codigo;
    do {
        codigo = parseInt(prompt("Ingrese el codigo del disco (entre 1 y 999):"));
    } while (!validarCodigo(codigo));

    let portada;
    do {
        portada = prompt("Ingrese el enlace de la portada del disco:");
    } while (!validarURL(portada));

    let nuevoDisco = new Disco(nombre, autor, codigo, portada);
     

    let continuar;
    do {
        let nombrePista;
        do {
            nombrePista = prompt("Ingrese el nombre de la pista:");
        } while (!validarPista(nombrePista));
        let duracion;
        do {
            duracion = parseInt(prompt("Ingrese la duración de la pista en segundos (entre 0 y 7200):"));
        } while (!validarDuracion(duracion));

        nuevoDisco.agregarPista(nombrePista, duracion);
        continuar = confirm("¿Desea ingresar otra pista?");
    } while (continuar);
    discos.push(nuevoDisco);
    alert("Disco Cargado");
}

// Variables Globales
let cantidadPistas = 0;
let cantidadDiscos = 0;
let duracionTotal = 0;
let duracionMasAlta = 0;
let duracionPromedio = 0;
let nPista = 0;
let pistaMasLarga = 0;

// Funcion Contar Discos
function contarDiscos() {
    cantidadDiscos = discos.length;
    return cantidadDiscos;
}

// Funcion Contar Pistas
function contarPistas() {
    for (let disco of discos) {
        cantidadPistas = disco.pistas.length;
    }
    return cantidadPistas;
}

// Funcion Duracion de discos
function duracionDiscoTotal(pistas) {
    duracionTotal = 0;
    for (let pista of pistas) {
        duracionTotal += pista.duracion;
    }
    return duracionTotal;
}

// Funcion Duracion de discos promedio
function duracionDiscoPromedio(pistas) {
    duracionTotal = duracionDiscoTotal(pistas);
    cantidadPistas = pistas.length;
    if (cantidadPistas === 0) {
        return 0;
    } else {
        return duracionTotal / cantidadPistas;
    }
}

// Funcion Duracion total mas alta
function duracionTotalMasAlta() {
    for (let disco of discos) {
        let duracionDisco = duracionDiscoTotal(disco.pistas);
        if (duracionDisco > duracionMasAlta) {
            duracionMasAlta = duracionDisco;
        }
        console.log();
    }
    return duracionMasAlta;
}

// Funcion Obtener pista mas larga
function obtenerPistaMasLarga(pistas) {
    let pistaMasLarga = pistas[0];
    for (let pista of pistas) {
        if (pista.duracion > pistaMasLarga.duracion) {
            pistaMasLarga = pista;
        }
    }
    return pistaMasLarga;
}

// Función para convertir segundos a formato HH:MM:SS o MM:SS
function convertirDuracion(segundosTotales) {
    const fecha = new Date(segundosTotales * 1000);

    let hh = fecha.getUTCHours().toString();
    let mm = fecha.getUTCMinutes().toString();
    let ss = fecha.getUTCSeconds().toString();

    // Agregar el cero a la izquierda si es necesario
    hh = hh < 10 ? "0" + hh : hh;
    mm = mm < 10 ? "0" + mm : mm;
    ss = ss < 10 ? "0" + ss : ss;

    // Si las horas son "00", omitimos mostrarlas
    return hh === "00" ? `${mm}:${ss}` : `${hh}:${mm}:${ss}`;
}

// Función para Mostrar
function mostrar() {
    let discosHTML = '';
    nPista = 1;
    cantidadDiscos = contarDiscos();
    cantidadPistas = contarPistas();
    let duracionMasAltaTotal = duracionTotalMasAlta();
    let discoDuracionMaxima = discos.find(disco => duracionDiscoTotal(disco.pistas) === duracionMasAltaTotal);

    discosHTML += `<div class="row justify-content-center">
                        <p class="negrita">Cantidad discos: <span class="rojo">${cantidadDiscos}</span></p>
                        <p class="negrita">El disco con duración total más alta es: <span class="rojo">${discoDuracionMaxima.nombre}</span> con <span class="rojo">${convertirDuracion(duracionMasAltaTotal)}</span></p>`;

    for (let disco of discos) {
        duracionTotal = duracionDiscoTotal(disco.pistas);
        duracionPromedio = duracionDiscoPromedio(disco.pistas);
        pistaMasLarga = obtenerPistaMasLarga(disco.pistas);

        discosHTML += `<div class="disco p-3 m-4 col-lg-3">
                            <img alt="disco" src="${disco.portada}">
                            <h2>${disco.nombre}</h2>
                            <p><span>Autor:</span> ${disco.autor}</p>
                            <p><span>Codigo:</span> ${disco.codigo}</p>
                            <p><span>N° Pistas:</span> ${cantidadPistas}</p>`;

        disco.pistas.forEach(pista => {
            let duracionFormateada = convertirDuracion(pista.duracion);
            if (pista.duracion > 180) {
                discosHTML += `<p><span>${nPista}°:</span> ${pista.nombre} - <span class="rojo">${duracionFormateada}</span></p>`;
            } else {
                discosHTML += `<p><span>${nPista}°:</span> ${pista.nombre} - <span>${duracionFormateada}</span></p>`;
            }
            nPista++;
        });

        discosHTML += ` <p><span>Pista con mayor duracion:</span> ${pistaMasLarga.nombre} (${convertirDuracion(pistaMasLarga.duracion)})</p>
                        <p><span>Duracion total:</span> ${convertirDuracion(duracionTotal)}</p>
                        <p><span>Duracion promedio:</span> ${convertirDuracion(duracionPromedio)}</p>
                    </div> `;
        nPista = 1;
    }
    discosHTML += `</div>`;
    document.getElementById('discos').innerHTML = discosHTML;
}

// Función para Mostrar por código
function mostrarPorCodigo() {
    let codigo = parseInt(prompt("Ingrese el codigo del disco que desea mostrar:"));
    let disco = discos.find(disco => disco.codigo === codigo);
    if (disco) {
        let discosHTML = '';
        duracionTotal = duracionDiscoTotal(disco.pistas);
        duracionPromedio = duracionDiscoPromedio(disco.pistas);
        pistaMasLarga = obtenerPistaMasLarga(disco.pistas);

        discosHTML += `<div class="row justify-content-center">`
        discosHTML += `<div class="disco p-3 m-4 col-lg-3">
                            <img alt="disco" src="${disco.portada}">
                            <h2>${disco.nombre}</h2>
                            <p><span>Autor:</span> ${disco.autor}</p>
                            <p><span>Codigo:</span> ${disco.codigo}</p>
                            <p><span>N° Pistas:</span> ${cantidadPistas}</p>
                            <p><span>Pista con mayor duracion:</span> ${pistaMasLarga.nombre} (${convertirDuracion(pistaMasLarga.duracion)})</p>`;

        disco.pistas.forEach(pista => {
            let duracionFormateada = convertirDuracion(pista.duracion);
            if (pista.duracion > 180) {
                discosHTML += `<p><span>${nPista}°:</span> ${pista.nombre} - <span class="rojo">${duracionFormateada}</span></p>`;
            } else {
                discosHTML += `<p><span>${nPista}°:</span> ${pista.nombre} - <span>${duracionFormateada}</span></p>`;
            }
            nPista++;
        });

        discosHTML += ` <p><span>Pista con mayor duracion:</span> ${pistaMasLarga.nombre} (${convertirDuracion(pistaMasLarga.duracion)})</p>
                        <p><span>Duracion total:</span> ${convertirDuracion(duracionTotal)}</p>
                        <p><span>Duracion promedio:</span> ${convertirDuracion(duracionPromedio)}</p>
                        </div>`;
        nPista = 1;
        discosHTML += `</div>`;

        document.getElementById('discos').innerHTML = discosHTML;
    } else {
        alert("No se encontró ningun disco.");
    }
}


// Funcion para cargar los discos desde JSON
function cargarDiscosDesdeJSON() {
    fetch('discos.json')
        .then(response => response.json())
        .then(data => {
            discos = data;
            alert("Discos cargados desde JSON.");
            mostrar();
        })
        .catch(error => {
            console.error('Error al cargar los discos desde el JSON:', error);
        });
}

document.getElementById('mostrarDiscos').addEventListener('click', cargarDiscosDesdeJSON);

