import { Router } from "express";
import {
  getDirectors,
  getDirector,
  postDirector,
  putDirector,
  deletDirector,
} from "../controllers/directorsControllers.js";
import { authJWT } from "../middlewares/authMiddleware.js";

export const router = Router();

router
  .get("/", getDirectors)
  .get("/:id", getDirector)
  .post("/", authJWT, postDirector)
  .put("/:id", authJWT, putDirector)
  .delete("/:id", authJWT, deletDirector);
