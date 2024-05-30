import multer, { MulterError } from "multer";
import { extname, resolve } from "path";

const random = () => Math.floor(Math.random() * 10000 + 10000);

export default {
  filefilter: (req, file, cb) => {
    if (file.mimetype != "image/png" && file.mimetype != "image/jpg") {
      return cb(new MulterError("O arquivo deve ser no formato PNG ou JPG."));
    }
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, "..", "..", "uploads", "images"));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${random()}${extname(file.originalname)}`);
    },
  }),
};
