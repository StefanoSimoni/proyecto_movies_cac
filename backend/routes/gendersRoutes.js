import { Router } from "express";
import {
  getGenders,
  getGender,
  postGender,
  putGender,
  deletGender,
} from "../controllers/gendersControllers.js";
import { authJWT } from "../middlewares/authMiddleware.js";

export const router = Router();

router
  .get("/", getGenders)
  .get("/:id", getGender)
  .post("/", authJWT, postGender)
  .put("/:id", authJWT, putGender)
  .delete("/:id", authJWT, deletGender);
