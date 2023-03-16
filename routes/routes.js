import { Router } from "express";
const myRouter = Router();


myRouter.get("/", (req, res) => {
    res.send("PRUEBA");
});

export default myRouter;