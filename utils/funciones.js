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

export async function iniTablaPosiciones() {
    try {
        const stats = await fs.promises.readFile("./data/tabla.json");
        console.log(true)
    } catch (err) {
        const tabla = [];
        const arrCarrera = [];

        const circuito = await leerArchivoCircuitos();
        const equipo = await leerArchivoEquipo();
        
        tabla.push({idEsc: 0, nombre: "banderas", img: "", arrCarrera: []});

        // columnas de banderas
        circuito.carrera.forEach(e => {
            tabla[0].arrCarrera.push({puntaje: e.flag});
            arrCarrera.push({puntaje: "-"});
        });

         // fila de pilotos
        equipo.equipos.forEach(e => {    
            tabla.push({idEsc: e.id, nombre: e.piloto1, img: e.team, arrCarrera: arrCarrera});
            tabla.push({idEsc: e.id, nombre: e.piloto2, img: e.team, arrCarrera: arrCarrera});
        });

        console.log(tabla)

        fs.writeFile('./data/tabla.json', JSON.stringify(tabla), err => {
            if (err) throw err;
        });
    };
};

export async function prepararCarrera(idCarrera) {
    await iniTablaPosiciones();

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
        arrTablaCarrera.equipo.push({img: e.team})
    });

    return arrTablaCarrera;
}
