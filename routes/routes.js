import { Router } from "express";
const myRouter = Router();


myRouter.get("/", (req, res) => {
    res.send("PRUEBA");
});

myRouter.get("/", (req,res) => {
    
})

export default myRouter;