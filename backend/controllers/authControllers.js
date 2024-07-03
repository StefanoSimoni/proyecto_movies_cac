import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, readUserByEmail } from "../db/daos/usersDaoMySQL.js";
import { parseUser } from "../helpers/usersHelper.js";
import { config } from "../auth/config/authJWTConfig.js";

const register = async (req, res) => {
  const user = parseUser(req.body);

  const { password } = user;

  const hash = bcrypt.hashSync(password, 10);

  const result = await createUser({ ...user, password: hash });

  const token = jwt.sign(
    { isAdmin: result.isAdmin },
    config.secretKey,
    config.token
  );

  result
    ? res.cookie("token", token, config.cookie)
    : res.send("Somethig went wrong");
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const [user] = await readUserByEmail(email);

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      { isAdmin: user.isAdmin },
      config.secretKey,
      config.token
    );
    res.status(201);
    res.cookie("token", token, config.cookie);
    res.redirect("/");
  } else {
    res.send("Incorrect email or password");
  }
};

export { register, login };
