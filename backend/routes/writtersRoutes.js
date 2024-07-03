import { Router } from "express";
import {
  getWritters,
  getWritter,
  postWritter,
  putWritter,
  deletWritter,
} from "../controllers/writtersControllers.js";
import { authJWT } from "../middlewares/authMiddleware.js";
import { authAdmin } from "../middlewares/isAdminMiddleware.js";

export const router = Router();

router
  .get("/", authJWT, authAdmin, getWritters)

  .get("/:id", authJWT, authAdmin, getWritter)

  .post("/", authJWT, authAdmin, postWritter)

  .put("/", authJWT, authAdmin, putWritter)

  .delete("/:id", authJWT, authAdmin, deletWritter);
