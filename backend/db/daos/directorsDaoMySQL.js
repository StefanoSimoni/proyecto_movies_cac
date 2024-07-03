import { connection } from "../connections/mySQLConnection.js";

const createDirector = async (director) => {
  const query = `INSERT INTO Directors (name, last_name) VALUES ("${director.name}", "${director.last_name}")`;
  const [result] = await connection.promise().query(query);
  return result;
};

const readDirectors = async () => {
  const query = `SELECT * FROM Directors`;
  const [result] = await connection.promise().query(query);
  return result;
};

const readDirector = async (id) => {
  const query = `SELECT * FROM Directors WHERE id = ${id}`;
  const [result] = await connection.promise().query(query);
  return result;
};

const updateDirector = async (director) => {
  let fields = [];
  for (let key in director) {
    if (key !== "id") {
      fields.push(`${key} = "${director[key]}"`);
    }
  }
  const query = `UPDATE Directors SET ${fields.join(", ")} WHERE id = ${
    director.id
  }`;
  const [result] = await connection.promise().query(query);
  return result;
};

const deleteDirector = async (id) => {
  const query = `DELETE FROM Directors WHERE id = ${id}`;
  const [result] = await connection.promise().query(query);
  return result;
};

export {
  createDirector,
  readDirectors,
  readDirector,
  updateDirector,
  deleteDirector,
};
