import multer from "multer";
import { resolve } from "path";
import * as crypto from "crypto";

export default {
	upload(folder: string = "tmp") {
		return {
			storage: multer.diskStorage({
				destination: resolve(__dirname, "..", "..", folder),
				filename: (req, file, cb) => {
					const fileHash = crypto.randomBytes(16).toString("hex");
					const fileName = `${fileHash}-${file.originalname}`;
					return cb(null, fileName);
				},
			}),
		};
	},
};
