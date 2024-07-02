import { Router } from "express";
import {
  getMovies,
  getMovie,
  postMovie,
  putMovie,
  deletMovie,
} from "../controllers/moviesControllers.js";
import { authJWT } from "../middlewares/authMiddleware.js";

export const router = Router();

router
  .get("/", getMovies)

  .get("/:id", getMovie)

  .post("/", authJWT, postMovie)

  .put("/:id", authJWT, putMovie)

  .delete("/:id", authJWT, deletMovie);
