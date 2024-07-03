import { connection } from "../connections/mySQLConnection.js";

const createMovieGender = async (movieGender) => {
  const query = `INSERT INTO movies_genders (id_movies, id_genders) VALUES (${movieGender.id_movies}, ${movieGender.id_genders})`;
  const [result] = await connection.promise().query(query);
  return result;
};

const updateMovieGender = async (movieGender) => {
  const query = `UPDATE movies_genders SET id_genders = ${movieGender.id_genders} WHERE id_movies = ${movieGender.id_movies} AND id_genders = ${movieGender.old_id}`;
  const [result] = await connection.promise().query(query);
  return result;
};

const deleteMovieGender = async (id) => {
  const query = `DELETE FROM movies_genders WHERE id_movies = ${id}`;
  const [result] = await connection.promise().query(query);
  return result;
};

export { createMovieGender, updateMovieGender, deleteMovieGender };
