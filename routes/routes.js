import { Router } from "express";
import * as func from "../utils/funciones.js";

const myRouter = Router();

myRouter.get("/", (req, res) => {
<<<<<<< HEAD
    func.leerArchivoCircuitos().then(data => {
        console.log(data);
        res.render("main", data);
    });
=======
    res.render("main");
>>>>>>> Sas
});

export default myRouter;