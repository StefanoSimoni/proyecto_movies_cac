export const config = {
  secretKey: process.env.AUTH_SECRETKEY,
  token: { expiresIn: "3h" },
  cookie: { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, signed: true },
};
