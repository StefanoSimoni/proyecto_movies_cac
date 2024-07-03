const authAdmin = (req, res, next) => {
  if (req.isAdmin) {
    next();
  } else {
    return res.status(403).send("You need admin authorization");
  }
};

export { authAdmin };
