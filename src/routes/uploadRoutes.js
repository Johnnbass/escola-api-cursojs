import { Router } from "express";
import loginRequired from "../middlewares/loginRequired";

import uploadController from "../controllers/UploadController";

const router = new Router();

router.post("/", loginRequired, uploadController.store);

export default router;
