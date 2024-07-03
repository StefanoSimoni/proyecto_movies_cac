import express from "express";
import { router as usersRoutes } from "./routes/usersRoutes.js";
import { router as moviesRoutes } from "./routes/moviesRoutes.js";
import { router as authRoutes } from "./routes/authRoutes.js";
import { connection } from "./db/connections/mySQLConnection.js";
import cookieParser from "cookie-parser";
import { config } from "./auth/config/authJWTConfig.js";
import { router as directorsRoutes } from "./routes/directorsRoutes.js";
import { router as gendersRoutes } from "./routes/gendersRoutes.js";
import { router as writtersRoutes } from "./routes/writtersRoutes.js";

const app = express();
const PORT = 8080;

app.use(express.static("frontend"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.secretKey));

app.use("/auth", authRoutes);

app.use("/users", usersRoutes);
app.use("/movies", moviesRoutes);
app.use("/directors", directorsRoutes);
app.use("/genders", gendersRoutes);
app.use("/writters", writtersRoutes);

app.listen(PORT, () => {
  console.clear();
  console.log(`Listen at http://localhost:${PORT}`);
  connection.connect((err) =>
    err
      ? console.log("Conexion con la DB CaC_Movies fallida")
      : console.log("Conexion con la DB CaC_Movies exitosa")
  );
});
