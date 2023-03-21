import e from "express";
import * as fs from "fs"

// manipulacion archivo circuitos.json
export async function leerArchivoCircuitos() {
    const data = await fs.promises.readFile("./data/circuitos.json", (err, data) => {
        if (err) throw err 
        return data
    });

    return await JSON.parse(data);
};

async function modificarArchivoCircuitosById(id) {
    const circuitos =  await leerArchivoCircuitos();
    
    circuitos.circuito.forEach(e => {
        if (e.id == id) {
            e.isActive = false
        }
    })

    await fs.promises.writeFile('./data/circuitos.json', JSON.stringify(circuitos), err => {
        if (err) throw err;
    });
};

// manipulacion archivo carreras.json
export async function leerArchivoCarreras() {
    const data = await fs.promises.readFile("./data/carreras.json", (err, data) => {
        if (err) throw err 
        return data
    });

    return await JSON.parse(data);
};

async function modificarArchivoCarreras(data) {
    await fs.promises.writeFile('./data/carreras.json', JSON.stringify(data), err => {
        if (err) throw err;
    });
};

// No Sirve se debe modificar
export async function leerArchivoEquipo() {
    const data = await fs.promises.readFile("./data/equipos.json", (err, data) => {
        if (err) throw err
        return data
    });

    return await JSON.parse(data);
};

// manipulacion archivo pilotos.json
export async function leerArchivoPilotos() {
    const dt = await fs.promises.readFile("./data/pilotos.json", (err, data) => {
        if (err) throw err 
        return data
    });

    return await JSON.parse(dt);
};

async function modificarArchivoPilotosById(ids) {
    const pilotos =  await leerArchivoPilotos();
    
    pilotos.piloto.forEach(p => {
        ids.forEach(id => {
            if (p.id == id) {
                p.isAlive = false;
            };
        });
    });

    await fs.promises.writeFile('./data/pilotos.json', JSON.stringify(pilotos), err => {
        if (err) throw err;
    });
};

// manipulacion archivo puntajes.json
export async function leerArchivoPuntajes() {
    const data = await fs.promises.readFile("./data/puntajes.json", (err, data) => {
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

export async function leerArchivoSimulacionPublic() {
    const data = await fs.promises.readFile("./public/js/simulacion.json", (err, data) => {
        if (err) throw err 
        return data
    });
    
    return await JSON.parse(data);
};

export async function modificarArchivoSimulacionPublic(data) {
    await fs.promises.writeFile('./public/js/simulacion.json', JSON.stringify(data), err => {
        if (err) throw err;
    });
};

export async function tablaPosiciones() {
    const circuitos = await leerArchivoCircuitos();
    const pilotos = await leerArchivoPilotos();
    const carreras = await leerArchivoCarreras();

    const tp = {tablaPosiciones: []};
    const arrPuntos = [];

    // primera fila de las Banderas
    tp.tablaPosiciones.push({idPiloto: 0, nomPiloto: "", imgEscudo: "", total: 0, puntos: []});

    circuitos.circuito.forEach(c => {
        tp.tablaPosiciones[0].puntos.push({puntaje: c.flag});
        arrPuntos.push({puntaje: "-"});
    });

    // fila de pilotos
    pilotos.piloto.forEach(p => {
        tp.tablaPosiciones.push({idPiloto: p.id, nomPiloto: p.piloto, imgEscudo: p.team, total: 0, puntos: arrPuntos});
    });

    // llenar tabla
    carreras.carrera.forEach(carrera => {
        const idCarrera = carrera.id - 1;

        carrera.pilotos.forEach(piloto => {
            const idPiloto = piloto.id;
            const puntos = piloto.puntaje;
            console.log({idPiloto: idPiloto, idCarrera: idCarrera});

            tp.tablaPosiciones[idPiloto].total += puntos;
            tp.tablaPosiciones[idPiloto].puntos[idCarrera].puntaje = puntos;
        });
    });

    return tp;
};

export async function iniTablaPosiciones() {
    const data = {tabla: []};
    const arrCarrera = [];

    const circuitos = await leerArchivoCircuitos();
    const pilotos = await leerArchivoPilotos();

    data.tabla.push({idEsc: 0, nombre: "banderas", img: "", total: 0, arrCarrera: []});

    // columnas de banderas
    circuitos.circuito.forEach(e => {
        data.tabla[0].arrCarrera.push({puntaje: e.flag});
        arrCarrera.push({puntaje: "-"});
    });

     // fila de pilotos
    pilotos.piloto.forEach(e => {    
        data.tabla.push({idPiloto: e.id, idEsc: e.idEscuderia, nombre: e.piloto, img: e.team, total: 0, arrCarrera: arrCarrera});
    });

    await fs.promises.writeFile('./data/tabla.json', JSON.stringify(data), err => {
        if (err) throw err;
    });
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

export async function tablaCarrera() {
    const circuitos = await leerArchivoCircuitos();
    const equipo = await leerArchivoEquipo();
    const arrTablaCarrera = {circuito: [], equipo: []};

    circuitos.circuito.forEach(e => {
        arrTablaCarrera.circuito.push({img: e.flag})
    });

    equipo.equipos.forEach(e => {
        arrTablaCarrera.equipo.push({img: e.team});
    });
    
    return arrTablaCarrera;
}

export async function prepararCarrera(idCarrera) {
    const leerCircuito = await leerArchivoCircuitos();
    const circuito = leerCircuito.circuito.filter(e => e.id == idCarrera)[0];

    if (circuito.isActive) {
        const leerPilotos = await leerArchivoPilotos();
        const pilotos = leerPilotos.piloto.filter(e => e.isAlive == true);
        const carrera = {... circuito, pilotos};

        await crearSimulacion(circuito, pilotos);

        return {... circuito, pilotos};
    } else {
        return {isActive: false, carrera: leerCircuito};
    };
};

async function crearSimulacion(circuito, pilotos) {
    const puntajes = await leerArchivoPuntajes();
    const posibilidades = await leerArchivoEstado();
    const simulacion = [];
    const meta = 8;
    let lugar = 0;

    for (let i=0; i<meta; i++) {
        const aux = []

        pilotos.forEach(piloto => {
            const estado = randomprob(posibilidades.estado);

            if (piloto.isRaceActive && piloto.lugar == 0) {
                if (!estado.vivo) {
                    piloto.isAlive = false;
                    piloto.isRaceActive = false
                    piloto.car = '/img/rip.svg'
                    piloto.desc = estado.situacion;
                } else if (estado.puntuacion == 0) {
                    piloto.desc = estado.situacion; 
                    piloto.isRaceActive = false 
                } else {
                    piloto.dist += estado.puntuacion;
                    if (piloto.dist >= meta) {
                        lugar += 1;
                        piloto.isRaceActive = false;
                        piloto.lugar = lugar;
                        piloto.dist = meta;
                        if (lugar <= 10) {
                            const ptje = puntajes.puntaje.find(e => e.posicion == lugar); 
                            piloto.puntaje = ptje.puntos;
                        } else {
                            piloto.puntaje = 0;
                        }
                    };
                };
            };
        
            aux.push(
                {
                    id: piloto.id,
                    isAlive: piloto.isAlive,
                    isRaceActive: piloto.isRaceActive,
                    dist: piloto.dist,
                    puntaje: piloto.puntaje,
                    car: piloto.car,
                    desc: piloto.desc,
                    lugar: piloto.lugar,
                }
            );
        });

        simulacion.push(aux);
    };

    const ids = []
    simulacion[simulacion.length -1].forEach(e => {
        if (!e.isAlive) {
            ids.push(e.id);
        }
    });

    // Mata a los pilotos en la UCI
    await modificarArchivoPilotosById(ids);

    // Desactiva la Carrerra para que no se repita
    await modificarArchivoCircuitosById(circuito.id);

    // crea el historico de carrearas
    const carrera = await leerArchivoCarreras();
    carrera.carrera.push({...circuito, pilotos: simulacion[simulacion.length -1]});
    await modificarArchivoCarreras(carrera);

    // crea la simulacion animada
    await modificarArchivoSimulacionPublic(simulacion);
};

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
function randomprob(probabilidad) {
    let arr = [];
    let freq = [];
    let resultado = '';

    probabilidad.forEach(element => {
        arr.push(element.id);
        freq.push(element.prob);
    });

    resultado = myRand(arr, freq, arr.length);

    return probabilidad[resultado];
}
