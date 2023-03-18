import { response, Router } from "express";
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
    func.leerTablaPosiciones().then(data => {
        res.render("posiciones", {bandera: data.tabla[0].arrCarrera, data});
    });
});

myRouter.get("/carrera/:idCircuito", (req, res) => {
    const idCircuito = req.params.idCircuito;

    if (!isNaN(idCircuito) && idCircuito > 0 && idCircuito < 24) {
        func.prepararCarrera(parseInt(idCircuito)).then(carrera => {
            if (carrera.isActive) {
                res.render("carrera", carrera);
            } else {
                res.render("calendario", carrera.carrera);
            }           
        });
    } else {
        res.render("error");
    };
});

myRouter.all("*", (req,res) => {
    res.render("error");
})

export default myRouter;