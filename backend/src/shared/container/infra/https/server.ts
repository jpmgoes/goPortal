import express from "express";
import * as bodyParser from "body-parser";
import "reflect-metadata";
import cors from "cors";

import "../typeorm/database";
import "../../../container";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

//ex: http://localhost:3333/tmp/avatar/1234312-img.png
app.use("/tmp", express.static("tmp"))

app.listen(3333, () => {
	console.log("Server is running on port 3333");
});
