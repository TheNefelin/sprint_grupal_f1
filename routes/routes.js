import { Router } from "express";
import * as func from "../utils/funciones.js";

const myRouter = Router();

myRouter.get("/", (req, res) => {
    func.leerArchivoEquipo().then(data => {
        res.render("main", data);
    });
});

myRouter.get("/carrera", (req, res) => {
    func.leerArchivoEquipo().then(data => {
        res.render("carrera", data);
    });
});

myRouter.get("/calendario", (req, res) => {
    func.leerArchivoCircuitos().then(data => {
        res.render("calendario", data);
        console.log(data)
    });
});

myRouter.get("/posiciones", (req, res) => {
    func.leerArchivoCircuitos().then(data => {
        res.render("posiciones", data);
    });
});

export default myRouter;