//crear los selectores
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");
const resultado = document.querySelector("#resultado");

//crear los años
const max = new Date().getFullYear();
const min = max - 10;

for(let i=max; i>=min; i--){
    const option = document.createElement("option");
    option.value = i;
    option.innerText = i;
    document.querySelector("#year").appendChild(option);
}

//crear estructura para guardar los datos de la busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}

//crear eventos

//cargar la bd de los autos
document.addEventListener("DOMContentLoaded",() =>{
    mostrarAutos(autos);
})

marca.addEventListener("input", e =>{
    datosBusqueda.marca = e.target.value;
    console.log(datosBusqueda.marca)
    filtrarAuto();
})

year.addEventListener("input", e =>{
    datosBusqueda.year = Number(e.target.value);
    console.log(datosBusqueda.year)
    filtrarAuto();
})

minimo.addEventListener("input", e =>{
    datosBusqueda.minimo = Number(e.target.value);
    console.log(datosBusqueda.minimo)
    filtrarAuto();
})

maximo.addEventListener("input", e =>{
    datosBusqueda.maximo = Number(e.target.value);
    console.log(datosBusqueda.maximo)
    filtrarAuto();
})

puertas.addEventListener("input", e =>{
    datosBusqueda.puertas = Number(e.target.value);
    console.log(datosBusqueda.puertas)
    filtrarAuto();
})

transmision.addEventListener("input", e =>{
    datosBusqueda.transmision = e.target.value;
    console.log(datosBusqueda.transmision)
    filtrarAuto();
})

color.addEventListener("input", e =>{
    datosBusqueda.color = e.target.value;
    console.log(datosBusqueda.color)
    filtrarAuto();
})
console.log(datosBusqueda);
function mostrarAutos(autos){
    limpiarHTML();
    //construir el HTML para colocar el listado de los autos que tengo en
    autos.forEach(auto => { //autos es el arreglo de db.js
        const autoHTML = document.createElement('p');
        const {marca, modelo, year, puertas, transmision, precio, color} = auto //destructuring
        autoHTML.innerHTML = `
            <p>${marca} - ${modelo} - ${year} - ${puertas} Puertas - Transmision: ${transmision} - Precio: ${precio} - Color: ${color}</p>
        `;
        resultado.appendChild(autoHTML);
    })
}
function limpiarHTML(){
    while(resultado.firstChild){ 
        resultado.removeChild(resultado.firstChild)
    }
}
function filtrarAuto(){
   const resultado2 = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor)
   console.log(resultado2)
   if (resultado2.length){
        mostrarAutos(resultado2);
   }else{
        noResultado();
   }
}

function noResultado(){
    limpiarHTML();
    const noResultado = document.createElement("div");
    noResultado.classList.add("alerta", "error");
    noResultado.appendChild(document.createTextNode("No hay resultados para su busqueda"))
    resultado.appendChild(noResultado);
}   
function filtrarMarca(auto){
    if(datosBusqueda.marca){
        console.log("tiene datos")
        return auto.marca === datosBusqueda.marca
    }
    return auto;
}
function filtrarYear(auto){
    if(datosBusqueda.year){
        return auto.year === datosBusqueda.year
    }
    return auto;
}
function filtrarMinimo(auto){
    if(datosBusqueda.minimo){
        return auto.precio >= datosBusqueda.minimo
    }
    return auto
}
function filtrarMaximo(auto){
    if(datosBusqueda.maximo){
        return auto.precio <= datosBusqueda.maximo
    }
    return auto;
}
function filtrarPuertas(auto){
    if(datosBusqueda.puertas){
        return auto.puertas === datosBusqueda.puertas
    }
    return auto;
}
function filtrarTransmision(auto){
    if(datosBusqueda.transmision){
        return auto.transmision === datosBusqueda.transmision
    }
    return auto;
}
function filtrarColor(auto){
    if(datosBusqueda.color){
        return auto.color === datosBusqueda.color
    }
    return auto;
}