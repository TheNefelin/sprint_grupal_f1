import { Router } from "express";
import * as fs from "fs"

const myRouter = Router();


myRouter.get("/", (req, res) => {
    leerArchivoCircuitos().then(data => {
        console.log(data);
        res.render("main", data);
    });
});

async function leerArchivoCircuitos() {
    const data = await fs.promises.readFile("./data/circuitos.json", (err, data) => {
        if (err) throw err 
        return data
    });
    return await JSON.parse(data);
}

export default myRouter;