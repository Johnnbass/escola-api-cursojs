import multer from "multer";
import multerConfig from "../config/multerConfig";
import Upload from "../models/Upload";

const upload = multer(multerConfig).single("upload");

class UploadController {
  store(req, res) {
    return upload(req, res, async (err) => {
      if (err) return res.status(400).json({ errors: [err.code] });

      try {
        const { originalname, filename } = req.file;
        const { aluno_id } = req.body;
        const upload = await Upload.create({
          originalname,
          filename,
          aluno_id,
        });

        return res.json(upload);
      } catch (e) {
        return res.status(400).json({ errors: ["Este aluno não existe."] });
      }

    });
  }
}

export default new UploadController();
