import { response, Router } from "express";
import * as func from "../utils/funciones.js";

const myRouter = Router();

myRouter.get("/", (req, res) => {
    func.tablaCarrera().then(data => {
        res.render("main", data);
    });
});

myRouter.get("/posicionespiloto", (req, res) => {
    func.leerTablaPosiciones().then(data => {
        res.render("posicionesPiloto", {bandera: data.tabla[0].arrCarrera, data});
    });
});

myRouter.get("/posicionesescuderia", (req, res) => {
    func.leerArchivoEquipo().then(data => {
        console.log(data.equipos)
        res.render("posicionesEscuderia", {escudos: data.equipos, data});
    })
})

myRouter.get("/calendario", (req, res) => {
    func.leerArchivoCircuitos().then(data => {
        res.render("calendario", data);
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

export default myRouter;