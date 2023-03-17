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

export async function tablaPosiciones() {
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
    let circuito = await leerArchivoCircuitos();
    const equipo = await leerArchivoEquipo();

    circuito = circuito.carrera.filter(e => e.id == idCarrera);
    circuito = circuito[0];

    const piloto = {pilotos: []}

    equipo.equipos.forEach(e => {       
        if (e.isP1) {
            piloto.pilotos.push({idCircuito: circuito.id, idEscuderia: e.id, piloto: e.piloto1, car: e.img, team: e.team});
        } else {
            piloto.pilotos.push({idCircuito: circuito.id, idEscuderia: e.id, piloto: e.piloto1, car: "", team: e.team});
        };

        if (e.isP2) {
            piloto.pilotos.push({idCircuito: circuito.id, idEscuderia: e.id, piloto: e.piloto2, car: e.img, team: e.team});
        } else {
            piloto.pilotos.push({idCircuito: circuito.id, idEscuderia: e.id, piloto: e.piloto2, car: "", team: e.team});
        };
    })

    console.log(circuito.circuito)
    return piloto;

    // if (circuito.isActive) {
    //     return [circuito, pilotos];
    // } else {
    //     return [circuito, [false]]
    // }
};

export async function iniciarCarrera() {
    
}

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
    let i;
    let resultado = '';

    probj.forEach(element => {
        arr.push(element.id);
        freq.push(element.prob);
    });

    resultado = myRand(arr, freq, arr.length);
    console.log(probj[resultado]);

    return probj[resultado];
}
