import { Router } from "express";
import * as func from "../utils/funciones.js";

const myRouter = Router();

myRouter.get("/", (req, res) => {
    func.tablaCarrera().then(data => {
        console.log(data);
        res.render("main", data);
    });
});

myRouter.get("/calendario", (req, res) => {
    func.leerArchivoCircuitos().then(data => {
        res.render("calendario", data);
    });
});

myRouter.get("/posiciones", (req, res) => {
    func.tablaPosiciones().then(data => {
        console.log({bandera: data.tabla[0].arrCarrera, data})
        res.render("posiciones", {bandera: data.tabla[0].arrCarrera, data});
    });
    // func.tablaCarrera().then(data => {
    //     console.log(data)
    //     res.render("posiciones", data);
    // });
});

myRouter.get("/carrera/:id", (req, res) => {
    if (!isNaN(req.params.id)) {
        func.prepararCarrera(parseInt(req.params.id)).then(data => {
            res.render("carrera", data);
        });
    };
});

export default myRouter;