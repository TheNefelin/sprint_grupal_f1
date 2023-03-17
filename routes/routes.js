import { Router } from "express";
import * as func from "../utils/funciones.js";

const myRouter = Router();

myRouter.get("/", (req, res) => {
    func.tablaCarrera().then(data => {
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
        res.render("posiciones", {bandera: data.tabla[0].arrCarrera, data});
    });
});

myRouter.get("/carrera/:id", (req, res) => {
    if (!isNaN(req.params.id)) {
        // preparar carrera o iniciar carrera
        if (true) {
            func.prepararCarrera(parseInt(req.params.id)).then(pilotos => {
                res.render("carrera", {data: pilotos});
            });
        } else {
            func.leerArchivoEstado().then(dt => {
                func.iniciarCarrera(dt).then(simulacion => {

                });
            });
            // await iniciarCarrera(ini)
            res.render("carrera", {data: pilotos});
        }
    };
});

myRouter.all("*", (req,res) => {
    res.render("error");
})


export default myRouter;