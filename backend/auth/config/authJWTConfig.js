export const config = {
  secretKey: "CaC_Movies_SecretKey",
  token: { expiresIn: "3h" },
  cookie: { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, signed: true },
};
