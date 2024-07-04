import { Router } from "express";
import {
  getUsers,
  getUser,
  putUser,
  deletUser,
  putUserAdmin,
  getUserByEmail,
} from "../controllers/usersControllers.js";
import { authJWT } from "../middlewares/authMiddleware.js";
import { authAdmin } from "../middlewares/isAdminMiddleware.js";

export const router = Router();

router
  .get("/", authJWT, authAdmin, getUsers)

  .get("/:id", authJWT, authAdmin, getUser)

  .get("/user", authJWT, getUserByEmail)

  .put("/", authJWT, putUser)

  .put("/admin", authJWT, authAdmin, putUserAdmin)

  .delete("/:id", authJWT, authAdmin, deletUser);
