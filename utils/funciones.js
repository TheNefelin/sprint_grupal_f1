import * as fs from "fs"

export async function leerArchivoCircuitos() {
    const data = await fs.promises.readFile("./data/circuitos.json", (err, data) => {
        if (err) throw err 
        return data
    });

    return await JSON.parse(data);
}

export async function leerArchivoEquipo() {
    const data = await fs.promises.readFile("./data/equipo.json", (err, data) => {
        if (err) throw err 
        return data
    });

    return await JSON.parse(data);
}