import * as fs from "fs"

export async function leerArchivoCircuitos() {
    const data = await fs.promises.readFile("./data/circuitos.json", (err, data) => {
        if (err) throw err 
        return data
    });

    return await JSON.parse(data);
};

export async function leerArchivoEquipo() {
    const data = await fs.promises.readFile("./data/equipo.json", (err, data) => {
        if (err) throw err 
        return data
    });

    return await JSON.parse(data);
};

export async function leerArchivoEstado() {
    const data = await fs.promises.readFile("./data/estados.json", (err, data) => {
        if (err) throw err 
        return data
    });

    return await JSON.parse(data);
};

export async function leerArchivoSimulacion() {
    const data = await fs.promises.readFile("./data/simulacion.json", (err, data) => {
        if (err) throw err 
        return data
    });

    return await JSON.parse(data);
};

export async function leerArchivoSimulacionPublic() {
    const data = await fs.promises.readFile("./public/js/simulacion.json", (err, data) => {
        if (err) throw err 
        return data
    });
    
    return await JSON.parse(data);
};

export async function leerTablaPosiciones() {
    try {
        const data = await fs.promises.readFile("./data/tabla.json", (err, data) => {
            if (err) throw err 
            return data;
        });

        return await JSON.parse(data);
    } catch {
        await iniTablaPosiciones();

        const data = await fs.promises.readFile("./data/tabla.json", (err, data) => {
            if (err) throw err 
            return data;
        });

        return await JSON.parse(data);
    };
};

export async function iniTablaPosiciones() {
    const data = {tabla: []};
    const arrCarrera = [];

    const circuito = await leerArchivoCircuitos();
    const equipo = await leerArchivoEquipo();

    data.tabla.push({idEsc: 0, nombre: "banderas", img: "", total: 0, arrCarrera: []});

    // columnas de banderas
    circuito.carrera.forEach(e => {
        data.tabla[0].arrCarrera.push({puntaje: e.flag});
        arrCarrera.push({puntaje: "-"});
    });

     // fila de pilotos
    equipo.equipos.forEach(e => {    
        data.tabla.push({idEsc: e.id, nombre: e.piloto1, img: e.team, total: 0, arrCarrera: arrCarrera});
        data.tabla.push({idEsc: e.id, nombre: e.piloto2, img: e.team, total: 0, arrCarrera: arrCarrera});
    });

    await fs.promises.writeFile('./data/tabla.json', JSON.stringify(data), err => {
        if (err) throw err;
    });
};

export async function prepararCarrera(idCarrera) {
    const circuito = await leerArchivoCircuitos();
    let carrera = circuito.carrera.filter(e => e.id == idCarrera)[0];

    console.log(carrera)

    if (carrera.isActive) {
        const equipo = await leerArchivoEquipo();
        const pilotos = []

        equipo.equipos.forEach(e => {       
            if (e.isP1) {
                pilotos.push({idCircuito: carrera.id, idEscuderia: e.id, piloto: e.piloto1, car: e.img, team: e.team, dist: 0, distT: 0});
            };
    
            if (e.isP2) {
                pilotos.push({idCircuito: carrera.id, idEscuderia: e.id, piloto: e.piloto2, car: e.img, team: e.team, dist: 0, distT: 0});
            };
        })

        await crearSimulacion(pilotos.length);

        return {... carrera, pilotos};
    } else {
        return {isActive: false, circuito};
    };
};

async function crearSimulacion(cant) {
    const estados =  await leerArchivoEstado();
    const sim = [];
    console.log(cant);
 
    let estado = true
    let n = 0
    while (estado) {
        for (let i = 0; i < cant; i++) {

        }
        
        n += 1;
        if (n > 5) {
            estado = false;
        };
    };

    // await fs.promises.writeFile('./data/simulacion.json', JSON.stringify(sim), err => {
    //     if (err) throw err;
    // });
};

export async function tablaCarrera() {
    const circuito = await leerArchivoCircuitos();
    const equipo = await leerArchivoEquipo();
    const arrTablaCarrera = {circuito: [], equipo: []};

    circuito.carrera.forEach(e => {
        arrTablaCarrera.circuito.push({img: e.flag})
    });

    equipo.equipos.forEach(e => {
        arrTablaCarrera.equipo.push({img: e.team});
    });
    
    return arrTablaCarrera;
}

//Funcion encontrar celda
function findCeil(arr, r, l, h) {
    let mid;
    while (l < h) {
        mid = l + ((h - l) >> 1);
        (r > arr[mid]) ? (l = mid + 1) : (h = mid);
    }
    return (arr[l] >= r) ? l : -1;
}

//Funcion randomixer
function myRand(arr, freq, n) {
    let prefix = [];
    let i;
    prefix[0] = freq[0];
    for (i = 1; i < n; ++i)
        prefix[i] = prefix[i - 1] + freq[i];
    let r = Math.floor((Math.random() * prefix[n - 1])) + 1;

    let indexc = findCeil(prefix, r, 0, n - 1);
    return arr[indexc];
}

//Funcion padre de calculo de probabilidad.
function randomprob(probj) {
    let arr = [];
    let freq = [];
    let resultado = '';

    probj.forEach(element => {
        arr.push(element.id);
        freq.push(element.prob);
    });

    resultado = myRand(arr, freq, arr.length);

    return probj[resultado];
}
