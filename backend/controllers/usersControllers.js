import {
  readUsers,
  readUser,
  updateUser,
  deleteUser,
  updateUserAdmin,
  readUserByEmail,
} from "../db/daos/usersDaoMySQL.js";
import { parseUser } from "../helpers/usersHelper.js";

const getUsers = async (_, res) => {
  const result = await readUsers();
  res.json(result);
};

const getUser = async (req, res) => {
  const result = await readUser(req.params.id);
  res.json(result);
};

const getUserByEmail = async (req, res) => {
  const result = await readUserByEmail(req.body);
  res.json(result);
};

const putUser = async (req, res) => {
  const user = parseUser(req.body);
  const result = await updateUser(user);
  res.json(result);
};

const putUserAdmin = async (req, res) => {
  const user = parseUser(req.body);
  const result = await updateUserAdmin(user);
  res.json(result);
};

const deletUser = async (req, res) => {
  const result = await deleteUser(req.params.id);
  res.json(result);
};

export { getUsers, getUser, getUserByEmail, putUser, putUserAdmin, deletUser };
