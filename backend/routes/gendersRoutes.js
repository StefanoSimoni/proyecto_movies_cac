import { Router } from "express";
import {
  getGenders,
  getGender,
  postGender,
  putGender,
  deletGender,
} from "../controllers/gendersControllers.js";
import { authJWT } from "../middlewares/authMiddleware.js";
import { authAdmin } from "../middlewares/isAdminMiddleware.js";

export const router = Router();

router
  .get("/", authJWT, authAdmin, getGenders)

  .get("/:id", authJWT, authAdmin, getGender)

  .post("/", authJWT, authAdmin, postGender)

  .put("/:id", authJWT, authAdmin, putGender)

  .delete("/:id", authJWT, authAdmin, deletGender);
