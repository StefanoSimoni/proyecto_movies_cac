import { Router } from "express";
import {
  getUsers,
  getUser,
  putUser,
  deletUser,
} from "../controllers/usersControllers.js";
import { authJWT } from "../middlewares/authMiddleware.js";

export const router = Router();

router
  .get("/", getUsers)

  .get("/:id", authJWT, getUser)

  .put("/:id", authJWT, putUser)

  .delete("/:id", authJWT, deletUser);
