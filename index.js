import express from "express";
// import * as helpers from "./utils/helpers.js"
import bodyParser from 'body-parser';
import hbs from "hbs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import routes from "./routes/routes.js"

const app = express();
const _root = import.meta.url;
const _dirname = dirname(fileURLToPath(_root));

app.listen(3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "hbs");
hbs.registerPartials(join(_dirname, "/views/partials"));
app.use(express.static("public"));
app.use(routes)
