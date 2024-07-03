import { connection } from "../connections/mySQLConnection.js";

const createMovieDirector = async (movieDirector) => {
  const query = `INSERT INTO Movies_Directors (id_movies, id_directors) VALUES (${movieDirector.id_movies}, ${movieDirector.id_directors})`;
  const [result] = await connection.promise().query(query);
  return result;
};

const updateMovieDirector = async (movieDirector) => {
  const query = `UPDATE Movies_Directors SET id_directors = ${movieDirector.id_directors} WHERE id_movies = ${movieDirector.id_movies} AND id_directors = ${movieDirector.old_id}`;
  const [result] = await connection.promise().query(query);
  return result;
};

const deleteMovieDirector = async (id) => {
  const query = `DELETE FROM Movies_Directors WHERE id_movies = ${id}`;
  const [result] = await connection.promise().query(query);
  return result;
};

export { createMovieDirector, updateMovieDirector, deleteMovieDirector };
