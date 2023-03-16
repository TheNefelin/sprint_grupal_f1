import { Router } from "express";
import * as func from "../utils/funciones.js";

const myRouter = Router();

myRouter.get("/", (req, res) => {
    func.leerArchivoEquipo().then(data => {
        res.render("main", data);
    });
});

export default myRouter;