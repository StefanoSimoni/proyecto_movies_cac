import { connection } from "../connections/mySQLConnection.js";

const createUser = async (user) => {
  const query = `INSERT INTO users (name, last_name, email, password, birthday, country, isAdmin) VALUES ("${
    user.name
  }", "${user.last_name}", "${user.email}", "${user.password}", "${
    user.birthday
  }", "${user.country}", ${0})`;
  const [result] = await connection.promise().query(query);
  return result;
};

const readUsers = async () => {
  const query = `SELECT * FROM users`;
  const [result] = await connection.promise().query(query);
  return result;
};

const readUser = async (id) => {
  const query = `SELECT * FROM users WHERE id = ${id}`;
  const [result] = await connection.promise().query(query);
  return result;
};

const readUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = "${email}"`;
  const [result] = await connection.promise().query(query);
  return result;
};

const updateUser = async (user) => {
  const query = `UPDATE users SET name = "${user.name}", last_name = "${user.last_name}", email = "${user.email}", password = "${user.password}", birthday = "${user.birthday}", country = "${user.country}" WHERE id = ${user.id}`;
  const [result] = await connection.promise().query(query);
  return result;
};

const updateUserAdmin = async (user) => {
  const query = `UPDATE users SET name = "${user.name}", last_name = "${user.last_name}", email = "${user.email}", password = "${user.password}", birthday = "${user.birthday}", country = "${user.country}", isAdmin = ${user.isAdmin} WHERE id = ${user.id}`;
  const [result] = await connection.promise().query(query);
  return result;
};

const deleteUser = async (id) => {
  const query = `DELETE FROM users WHERE id = ?`;
  const [result] = await connection.promise().query(query, [id]);
  return result;
};

export {
  createUser,
  readUsers,
  readUser,
  readUserByEmail,
  updateUser,
  updateUserAdmin,
  deleteUser,
};
