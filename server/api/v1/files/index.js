"use strict";

const path = require("path");
const fs = require("fs");
const { Router } = require("express");
const router = Router();
const ctrl = require("./files.controller");
const mdl = require("../middle");
const _ = require("lodash");
const multer = require("multer");
const storage = multer.diskStorage({
	// TODO: async folder check; random filename generation
	destination: (req, file, cb) => {
		const DestinationPath = path.join(
			__dirname,
			"..",
			"..",
			"..",
			"..",
			"static",
			"img",
			req.user._id.toString()
		);
		if (!fs.existsSync(DestinationPath)) fs.mkdirSync(DestinationPath);
		cb(null, DestinationPath);
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	}
});
const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } });

router.post("/", upload.single("avatar"), ctrl.UploadNewFile);

// router.delete("/:id", _.partial(mdl.validate, validations.idParam), ctrl.DeleteFile);

module.exports = router;
