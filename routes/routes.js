import { Router } from "express";
import * as func from "../utils/funciones.js";

const myRouter = Router();

myRouter.get("/", (req, res) => {
    func.leerArchivoCircuitos().then(data => {
        console.log(data);
        res.render("main", data);
    });
});

export default myRouter;