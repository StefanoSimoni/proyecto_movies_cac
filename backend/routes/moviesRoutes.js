import { Router } from "express";
import {
  getMovies,
  getMovie,
  postMovie,
  putMovie,
  deletMovie,
} from "../controllers/moviesControllers.js";
import { authJWT } from "../middlewares/authMiddleware.js";
import { authAdmin } from "../middlewares/isAdminMiddleware.js";

export const router = Router();

router
  .get("/", getMovies)

  .get("/:id", getMovie)

  .post("/", authJWT, authAdmin, postMovie)

  .put("/", authJWT, authAdmin, putMovie)

  .delete("/:id", authJWT, authAdmin, deletMovie);
