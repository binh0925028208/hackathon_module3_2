import express, { urlencoded } from "express";
import sequelize from "./configs/db.config";
import createTable from "./model";
import Router from "./router";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();

app.use(urlencoded());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
sequelize.authenticate();
createTable();

Router(app);

app.listen(8000, () => {
  console.log("http://localhost:8000");
});
