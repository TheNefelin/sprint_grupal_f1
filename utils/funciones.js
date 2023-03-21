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

async function modificarArchivoCircuitos(circuitos) {
    await fs.promises.writeFile('./data/circuitos.json', JSON.stringify(circuitos), err => {
        if (err) throw err;
    });
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

async function modificarArchivoPilotos(pilotos) {
    await fs.promises.writeFile('./data/pilotos.json', JSON.stringify(pilotos), err => {
        if (err) throw err;
    });
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

async function modificarArchivoSimulacionPublic(data) {
    await fs.promises.writeFile('./public/js/simulacion.json', JSON.stringify(data), err => {
        if (err) throw err;
    });
};

export async function resetFile() {
    const carreras = await leerArchivoCarreras();
    await modificarArchivoCarreras({ carrera: [] });

    const circuitos = await leerArchivoCircuitos();
    for (let i = 0; i < circuitos.circuito.length; i++) {
        circuitos.circuito[i].isActive = true;
    }
    await modificarArchivoCircuitos(circuitos);

    const pilotos = await leerArchivoPilotos();
    for (let i = 0; i < pilotos.piloto.length; i++) {
        pilotos.piloto[i].isAlive = true; 
    }
    await modificarArchivoPilotos(pilotos);
}

export async function tablaPosiciones() {
    const circuitos = await leerArchivoCircuitos();
    const pilotos = await leerArchivoPilotos();
    const carreras = await leerArchivoCarreras();

    const tp = {tablaPosiciones: []};
    const arrPuntos = [];

    // primera fila de las Banderas
    tp.tablaPosiciones.push({idPiloto: 0, nomPiloto: "", imgEscudo: "", total: 1000000, puntos: []});

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
        carrera.pilotos.forEach(piloto => {
            const obj = {idPiloto: piloto.id, idCarrera: carrera.id - 1, puntos: piloto.puntaje};

            tp.tablaPosiciones[obj.idPiloto].total += obj.puntos;
            tp.tablaPosiciones[obj.idPiloto].puntos[obj.idCarrera].puntaje = obj.puntos;
        });
    });

    tp.tablaPosiciones.sort((a, b) => (b.total - a.total));

    return tp;
};

export async function tablaAbandonos() {
    const data = await leerArchivoCarreras();
    const bPilotos = await leerArchivoPilotos();
    const arr = []

    data.carrera.forEach(carrera => {
        carrera.pilotos.forEach(pilotos => {
            if (pilotos.isAlive && pilotos.desc != "") {
                const dt = { id: pilotos.id, desc: pilotos.desc }
                const index = arr.findIndex(e => e.id == dt.id && e.desc == dt.desc)
                if (index == -1) {
                    const bp = bPilotos.piloto.find(e => e.id = pilotos.id);
                    arr.push({...dt, cant: 1, piloto: bp.piloto});
                } else {
                    arr[index].cant += 1;
                }
            };
        });
    });

   return arr.sort((a, b) => (a.id - b.id));
}; 

export async function tablaResumenCarreraById(id) {
    const carreras = await leerArchivoCarreras();
    const carrera = carreras.carrera.find(e => e.id == id);
    
    return await carrera.pilotos;
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
                        };
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
};

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
};

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
