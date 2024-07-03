import { Router } from "express";
import {
  getDirectors,
  getDirector,
  postDirector,
  putDirector,
  deletDirector,
} from "../controllers/directorsControllers.js";
import { authJWT } from "../middlewares/authMiddleware.js";
import { authAdmin } from "../middlewares/isAdminMiddleware.js";

export const router = Router();

router
  .get("/", authJWT, authAdmin, getDirectors)

  .get("/:id", authJWT, authAdmin, getDirector)

  .post("/", authJWT, authAdmin, postDirector)

  .put("/:id", authJWT, authAdmin, putDirector)

  .delete("/:id", authJWT, authAdmin, deletDirector);
