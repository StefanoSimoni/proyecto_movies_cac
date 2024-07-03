export const parseUser = (data) => {
  const user = {
    id: parseInt(data.id),
    ...data,
    isAdmin: parseInt(data.isAdmin),
  };
  return user;
};
