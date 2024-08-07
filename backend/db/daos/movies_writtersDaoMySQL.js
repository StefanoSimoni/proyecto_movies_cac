import { connection } from "../connections/mySQLConnection.js";

const createMovieWritter = async (movieWritter) => {
  const query = `INSERT INTO movies_writters (id_movies, id_writters) VALUES (${movieWritter.id_movies}, ${movieWritter.id_writters})`;
  const [result] = await connection.promise().query(query);
  return result;
};

const updateMovieWritter = async (movieWritter) => {
  const query = `UPDATE movies_writters SET id_writters = ${movieWritter.id_writters} WHERE id_movies = ${movieWritter.id_movies} AND id_writters = ${movieWritter.old_id}`;
  const [result] = await connection.promise().query(query);
  return result;
};

const deleteMovieWritter = async (id) => {
  const query = `DELETE FROM movies_writters WHERE id_movies = ${id}`;
  const [result] = await connection.promise().query(query);
  return result;
};

export { createMovieWritter, updateMovieWritter, deleteMovieWritter };
