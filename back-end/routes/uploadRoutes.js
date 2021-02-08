import path from 'path';
import express from 'express';
import multer from 'multer';
const router = express.Router();

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cd(null, 'uploads/');
	},
	filename(req, file, cb) {
		cb(null, `${fieldname}-${Date.now()}${path.extname(file.originalname)}`);
	}
});
function checkFileType(file, cb) {
	const fileTypes = /jpg|png|jpeg/;
	const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
	const mimetypes = fileTypes.test(file.mimetypes);

	if (extname && mimetypes) {
		return cb(null, true);
	} else {
		cb('seulement les images');
	}
}
const upload = multer({
	storage,
	fileFilter: function(req, file, cb) {
		checkFileType(file, cb);
	}
});

router.post('/', upload.single, (req, res) => {
	res.send(`/${req.file.path}`);
});

export default router;
