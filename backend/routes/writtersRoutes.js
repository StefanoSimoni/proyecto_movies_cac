import { Router } from "express";
import {
  getWritters,
  getWritter,
  postWritter,
  putWritter,
  deletWritter,
} from "../controllers/writtersControllers.js";
import { authJWT } from "../middlewares/authMiddleware.js";

export const router = Router();

router
  .get("/", getWritters)
  .get("/:id", getWritter)
  .post("/", authJWT, postWritter)
  .put("/:id", authJWT, putWritter)
  .delete("/:id", authJWT, deletWritter);
