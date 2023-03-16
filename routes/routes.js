import { Router } from "express";
const myRouter = Router();


myRouter.get("/", (req, res) => {
    res.render("main");
});

export default myRouter;