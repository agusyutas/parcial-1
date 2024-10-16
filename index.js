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
    constructor(nombre, autor, codigo) {
        this.nombre = nombre;
        this.autor = autor;
        this.codigo = codigo;
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

    let nuevoDisco = new Disco(nombre, autor, codigo);

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


// Funcion para Mostrar
function mostrar() {
    let discosHTML = '';
    nPista = 1;
    cantidadDiscos = contarDiscos();
    cantidadPistas = contarPistas();
    let duracionMasAltaTotal = duracionTotalMasAlta();
    let discoDuracionMaxima = discos.find(disco => duracionDiscoTotal(disco.pistas) === duracionMasAltaTotal);

    discosHTML += `<div class="row justify-content-center">
                        <p class="negrita">Cantidad discos: <span class="rojo">${cantidadDiscos}</span></p>
                        <p class="negrita">El disco con duración total más alta es: <span class="rojo">${discoDuracionMaxima.nombre}</span> con <span class="rojo">${duracionMasAltaTotal}</span> segundos</p>`;

    for (let disco of discos) {
        duracionTotal = duracionDiscoTotal(disco.pistas);
        duracionPromedio = duracionDiscoPromedio(disco.pistas);
        pistaMasLarga = obtenerPistaMasLarga(disco.pistas);

        discosHTML += `<div class="disco p-3 m-4 col-lg-3">
                            <img alt="disco" src="./img/disco.png">
                            <h2>${disco.nombre}</h2>
                            <p><span>Autor:</span> ${disco.autor}</p>
                            <p><span>Codigo:</span> ${disco.codigo}</p>
                            <p><span>N° Pistas:</span> ${cantidadPistas}</p>`;

        disco.pistas.forEach(pista => {
            if (pista.duracion > 300) {
                discosHTML += `<p><span>${nPista}°:</span> ${pista.nombre} - <span class="rojo">${pista.duracion}</span> segundos</p>`;
            } else {
                discosHTML += `<p><span>${nPista}°:</span> ${pista.nombre} - <span>${pista.duracion}</span> segundos</p>`;
            }
            nPista++;
        });

        discosHTML += ` <p><span>Pista con mayor duracion:</span> ${pistaMasLarga.nombre} (${pistaMasLarga.duracion} segundos)</p>
                        <p><span>Duracion total:</span> ${duracionTotal} segundos</p>
                        <p><span>Duracion promedio:</span> ${duracionPromedio} segundos</p>
                    </div> `;
        nPista = 1;
    }
    discosHTML += `</div>`
    document.getElementById('discos').innerHTML = discosHTML;
}


// Funcion para Mostrar por codigo
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
                            <img alt="disco" src="./img/disco.png">
                            <h2>${disco.nombre}</h2>
                            <p><span>Autor:</span> ${disco.autor}</p>
                            <p><span>Codigo:</span> ${disco.codigo}</p>
                            <p><span>N° Pistas:</span> ${cantidadPistas}</p>
                            <p><span>Pista con mayor duracion:</span> ${pistaMasLarga.nombre} (${pistaMasLarga.duracion} segundos)</p>`;

        disco.pistas.forEach(pista => {
            if (pista.duracion > 300) {
                discosHTML += `<p><span>${nPista}°:</span> ${pista.nombre} - <span class="rojo">${pista.duracion}</span> segundos</p>`;
            } else {
                discosHTML += `<p><span>${nPista}°:</span> ${pista.nombre} - <span>${pista.duracion}</span> segundos</p>`;
            }
            nPista++;
        });

        discosHTML += ` <p><span>Pista con mayor duracion:</span> ${pistaMasLarga.nombre} (${pistaMasLarga.duracion} segundos)</p>
                        <p><span>Duracion total:</span> ${duracionTotal} segundos</p>
                        <p><span>Duracion promedio:</span> ${duracionPromedio} segundos</p>
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


