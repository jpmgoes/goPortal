import express, { NextFunction, Request, Response } from "express";
import * as bodyParser from "body-parser";
import "reflect-metadata";
import cors from "cors";

import "../typeorm/database";
import "../../../container";

import { AppError } from "../../errors/AppError";
import { router } from "./routes";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

//ex: http://localhost:3333/tmp/avatar/1234312-img.png
app.use("/tmp", express.static("tmp"))

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof AppError) {
		return res.status(err.statusCode).json({ message: err.message });
	}

	return res.status(500).json({
		status: "error",
		message: `Internal server error - ${err.message}`,
	});
});

app.listen(3333, () => {
	console.log("Server is running on port 3333");
});
