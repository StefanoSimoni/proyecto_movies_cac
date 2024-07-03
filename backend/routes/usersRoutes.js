import { Router } from "express";
import {
  getUsers,
  getUser,
  putUser,
  deletUser,
} from "../controllers/usersControllers.js";
import { authJWT } from "../middlewares/authMiddleware.js";
import { authAdmin } from "../middlewares/isAdminMiddleware.js";

export const router = Router();

router
  .get("/", authJWT, authAdmin, getUsers)

  .get("/:id", authJWT, authAdmin, getUser)

  .put("/", authJWT, authAdmin, putUser)

  .delete("/:id", authJWT, authAdmin, deletUser);
