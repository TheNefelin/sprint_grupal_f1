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

export async function prepararCarrera(idCarrera) {
    const circuito = await leerArchivoCircuitos();
    const equipo = await leerArchivoEquipo();
    let carrera = circuito.carrera.filter(e => e.id == idCarrera);

    console.log(carrera)

    if (circuito.isActive) {
        return [circuito, equipo];
    } else {
        return [circuito, [false]]
    }
    
    // Promise.all([
    //     leerArchivoCircuitos(),
    //     leerArchivoEquipo(),
    // ]).then(data => {
    //     data[0] = data[0].carrera.filter(e => e.id == idCarrera);
    //     return data;
    // });
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
        arrTablaCarrera.equipo.push({img: e.team})
    });

    return arrTablaCarrera;
}
