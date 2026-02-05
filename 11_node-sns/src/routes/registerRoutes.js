import { Router } from "express";
import * as RegisterController from "../controllers/RegisterController.js";
// 入力チェック（バリデーション）専用のファイル
import { validate, registerValidationRules } from "../middlewares/validator.js";

// Auth Router
const router = Router();

// ミドルウェア: なし
// GET register/
router.get("/", RegisterController.index);
// POST register/
router.post("/", registerValidationRules, validate, RegisterController.add);

export default router;