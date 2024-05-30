import { Router } from "express";
import userController from "../controllers/UserController";
import loginRequired from "../middlewares/loginRequired";

const router = new Router();

// Rotas criadas apenas para exemplificar o crud - não deveriam existir
router.get("/", userController.index);
router.get("/:id", userController.show);

router.post("/", loginRequired, userController.store);
router.put("/", loginRequired, userController.update);
router.delete("/", loginRequired, userController.delete);

export default router;
