// Variables

const resultado = document.querySelector('#resultado');
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

const maxYear = new Date().getFullYear();
const minYear = maxYear - 10;

// Objeto Busqueda

const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

// Eventos

document.addEventListener('DOMContentLoaded', () => {

    mostrarAutos(autos);

    llenarSelect();

});

marca.addEventListener('change', asignarDatos);
year.addEventListener('change', asignarDatos);
minimo.addEventListener('change', asignarDatos);
maximo.addEventListener('change', asignarDatos);
puertas.addEventListener('change', asignarDatos);
transmision.addEventListener('change', asignarDatos);
color.addEventListener('change', asignarDatos);

// Funciones Event Listener

function asignarDatos(e) {

    datosBusqueda[e.target.id] = e.target.value;

    filtrarAuto();

}

// Funciones

function mostrarAutos (autos) {

    limpiarHTML();
    
    if(!autos.length) {

        noResultado();
        return;

    }

    autos.forEach( auto  => {

        const autoHTML = document.createElement('P');

        const { marca, modelo, year, puertas, transmision, precio, color } = auto;

        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: $${precio} - Color: ${color}
        `;

        // Insertar en el HTML
        resultado.appendChild(autoHTML);
        
    });

}

function limpiarHTML() {

    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }

}

function noResultado() {

    const sinDatos = document.createElement('DIV');
    sinDatos.classList.add('alerta', 'error');
    sinDatos.textContent = 'No hay resultados';
    resultado.appendChild(sinDatos);

}

function llenarSelect() {

    for( let i = maxYear; i >= minYear; i-- ) {

        const option = document.createElement('OPTION');
        option.value = i;
        option.textContent = i;

        year.appendChild(option);

    }

}

function filtrarAuto() {

    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear ).filter( filtrarMinimo ).filter( filtrarMaximo ).filter( filtrarPuertas ).filter( filtrarTransmision ).filter( filtrarColor );
    
    mostrarAutos(resultado);

}

function filtrarMarca(auto) {

    if(datosBusqueda.marca) {
        return auto.marca === datosBusqueda.marca;
    }

    return auto;

}

function filtrarYear(auto) {
    
    if(datosBusqueda.year) {
        return auto.year === parseInt( datosBusqueda.year );
    }

    return auto;

}

function filtrarMinimo(auto) {

    if(datosBusqueda.minimo) {
        return auto.precio >= parseInt( datosBusqueda.minimo );
    }

    return auto;

}

function filtrarMaximo(auto) {
    
    if(datosBusqueda.maximo) {
        return auto.precio <= parseInt( datosBusqueda.maximo );
    }

    return auto;

}

function filtrarPuertas(auto) {

    if(datosBusqueda.puertas) {
        return auto.puertas === parseInt( datosBusqueda.puertas );
    }

    return auto;

}

function filtrarTransmision(auto) {

    if(datosBusqueda.transmision) {
        return auto.transmision === datosBusqueda.transmision;
    }

    return auto;

}

function filtrarColor(auto) {

    if(datosBusqueda.color) {
        return auto.color === datosBusqueda.color;
    }

    return auto;

}