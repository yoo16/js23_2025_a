import { Hono } from "hono";
import * as taskController from "../controllers/taskController";

const router = new Hono();

router.get("/", taskController.index);
router.post("/", taskController.create);
router.put("/:id", taskController.update);
router.delete("/:id", taskController.remove);

export default router;
