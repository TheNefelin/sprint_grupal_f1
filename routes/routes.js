import { response, Router } from "express";
import * as func from "../utils/funciones.js";

const myRouter = Router();

myRouter.get("/", (req, res) => {
    func.tablaCarrera().then(data => {
        res.render("main", data);
    });
});

myRouter.get("/posicionespiloto", (req, res) => {
    func.tablaPosiciones().then(data => {
      res.render("posicionesPiloto", {bandera: data.tablaPosiciones[0], items: data.tablaPosiciones});
    });
});
//ADAPTAR
myRouter.get("/posicionesescuderia", (req, res) => {
    func.tablaEscuderia().then(() => {
        
    });

    func.leerArchivoEquipo().then(data => {
        res.render("posicionesEscuderia", {escudo: data.equipos});
    });
});

myRouter.get("/abandonos", (req, res) => {
    func.leerArchivoPilotos().then(data => {
        const fallecidos = data.piloto.filter(e => e.isAlive == false);
        // console.log(fallecidos)
        func.tablaAbandonos().then(abandonos => {
        // console.log(abandonos);
            res.render("abandonos", {fallecidos, abandonos});
        });
    })
});

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
                func.tablaResumenCarreraById(idCircuito).then(resumen => {
                    console.log(resumen)
                })
                res.render("carrera", carrera);
            } else {
                res.render("calendario", carrera.carrera);
            }           
        });
    } else {
        res.render("error");
    };
});

myRouter.get("/reset", (req, res) => {
    func.resetFile().then(() =>  {
        res.render("reset");
    });
});

export default myRouter;