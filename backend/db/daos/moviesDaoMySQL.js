import { parseStringsToArrays } from "../../helpers/moviesHelper.js";
import { connection } from "../connections/mySQLConnection.js";
import {
  createMovieDirector,
  deleteMovieDirector,
  updateMovieDirector,
} from "./movies_directorsDaoMySQL.js";
import {
  createMovieGender,
  deleteMovieGender,
  updateMovieGender,
} from "./movies_gendersDaoMySQL.js";
import {
  createMovieWritter,
  deleteMovieWritter,
  updateMovieWritter,
} from "./movies_writtersDaoMySQL.js";

const createMovie = async (movie) => {
  const query = `INSERT INTO movies (image, title, date, duration, overview, trailer, facebook, twitter, instagram, web, status, originalLenguage, budget, revenue) VALUES ("${movie.image}", "${movie.title}", "${movie.date}", "${movie.duration}", "${movie.overview}", "${movie.trailer}", "${movie.facebook}", "${movie.twitter}", "${movie.instagram}", "${movie.web}", "${movie.status}", "${movie.originalLanguage}", ${movie.budget}, ${movie.revenue})`;
  const [result] = await connection.promise().query(query);
  if (result.affectedRows) {
    JSON.parse(movie.directors).forEach((director) => {
      createMovieDirector({
        id_movies: result.insertId,
        id_directors: director.id,
      });
    });
    JSON.parse(movie.writters).forEach((writter) => {
      createMovieWritter({
        id_movies: result.insertId,
        id_writters: writter.id,
      });
    });
    JSON.parse(movie.genders).forEach((gender) => {
      createMovieGender({
        id_movies: result.insertId,
        id_genders: gender.id,
      });
    });
  }
  return result;
};

const readMovies = async () => {
  const query = `SELECT m.*, 
    GROUP_CONCAT(DISTINCT CONCAT(d.id, ",", d.name, ",", d.last_name)) directors, 
    GROUP_CONCAT(DISTINCT CONCAT(w.id, ",", w.name, ",", w.last_name)) writters, 
    GROUP_CONCAT(DISTINCT g.gender) genders 
    FROM movies m 
    INNER JOIN movies_directors md ON m.id = md.id_movies 
    INNER JOIN directors d ON d.id = md.id_directors 
    INNER JOIN movies_genders mg ON m.id = mg.id_movies 
    INNER JOIN genders g ON g.id = mg.id_genders 
    INNER JOIN movies_writters mw ON m.id = mw.id_movies 
    INNER JOIN writters w ON w.id = mw.id_writters
    GROUP BY m.id`;
  const [result] = await connection.promise().query(query);
  const response = result.map((result) => {
    const directors = parseStringsToArrays(result.directors);
    const writters = parseStringsToArrays(result.writters);
    return {
      ...result,
      directors,
      writters,
      genders: result.genders.split(","),
    };
  });
  return response;
};

const readMovie = async (id) => {
  const query = `SELECT m.*, 
    GROUP_CONCAT(DISTINCT CONCAT(d.id, ",", d.name, ",", d.last_name)) directors, 
    GROUP_CONCAT(DISTINCT CONCAT(w.id, ",", w.name, ",", w.last_name)) writters, 
    GROUP_CONCAT(DISTINCT g.gender) genders 
    FROM movies m 
    INNER JOIN movies_directors md ON m.id = md.id_movies 
    INNER JOIN directors d ON d.id = md.id_directors 
    INNER JOIN movies_genders mg ON m.id = mg.id_movies 
    INNER JOIN genders g ON g.id = mg.id_genders 
    INNER JOIN movies_writters mw ON m.id = mw.id_movies 
    INNER JOIN writters w ON w.id = mw.id_writters
    WHERE m.id = ${id}`;
  const [result] = await connection.promise().query(query);
  const response = result.map((result) => {
    const directors = parseStringsToArrays(result.directors);
    const writters = parseStringsToArrays(result.writters);
    return {
      ...result,
      directors,
      writters,
      genders: result.genders.split(","),
    };
  });
  return response;
};

const updateMovie = async (movie) => {
  const query = `UPDATE movies SET image = "${movie.image}", title = "${movie.title}", date = "${movie.date}", duration = "${movie.duration}", overview = "${movie.overview}", trailer = "${movie.trailer}", facebook = "${movie.facebook}", twitter = "${movie.twitter}", instagram = "${movie.instagram}", web = "${movie.web}", status = "${movie.status}", originalLenguage = "${movie.originalLanguage}", budget = ${movie.budget}, revenue = ${movie.revenue} WHERE id = ${movie.id}`;
  const [result] = await connection.promise().query(query);
  if (result.affectedRows) {
    JSON.parse(movie.directors).forEach((director) => {
      updateMovieDirector(
        {
          id_movies: movie.id,
          id_directors: director.id,
          old_id: director.old_id,
        },
        movie.id
      );
    });
    JSON.parse(movie.writters).forEach((writter) => {
      updateMovieWritter(
        {
          id_movies: movie.id,
          id_writters: writter.id,
          old_id: writter.old_id,
        },
        movie.id
      );
    });
    JSON.parse(movie.genders).forEach((gender) => {
      updateMovieGender({
        id_movies: movie.id,
        id_genders: gender.id,
        old_id: gender.old_id,
      });
    });
  }
  return result;
};

const deleteMovie = async (id) => {
  const query = `DELETE FROM movies WHERE id = ${id}`;
  deleteMovieDirector(id);
  deleteMovieWritter(id);
  deleteMovieGender(id);
  const [result] = await connection.promise().query(query);
  return result;
};

export { createMovie, readMovies, readMovie, updateMovie, deleteMovie };
