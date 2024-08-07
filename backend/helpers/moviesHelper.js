export const parseStringsToArrays = (string) => {
  const unParseArray = string.split(",");
  let array = [];
  for (let i = 0; i < unParseArray.length / 3; i++) {
    const parseArray = unParseArray.splice(0, 3);
    array = [
      ...array,
      {
        id: parseInt(parseArray[0]),
        name: parseArray[1],
        last_name: parseArray[2],
      },
    ];
  }
  return array;
};

export const parseMovie = (data) => {
  const movie = {
    id: parseInt(data.id),
    ...data,
    budget: parseFloat(data.budget) || 0,
    revenue: parseFloat(data.revenue) || 0,
  };
  return movie;
};

export const parsePartialMovie = (data) => {
  const movie = {};
  if (data.image !== undefined) movie.image = data.image;
  if (data.title !== undefined) movie.title = data.title;
  if (data.date !== undefined) movie.date = data.date;
  if (data.duration !== undefined) movie.duration = data.duration;
  if (data.overview !== undefined) movie.overview = data.overview;
  if (data.trailer !== undefined) movie.trailer = data.trailer;
  if (data.facebook !== undefined) movie.facebook = data.facebook;
  if (data.twitter !== undefined) movie.twitter = data.twitter;
  if (data.instagram !== undefined) movie.instagram = data.instagram;
  if (data.web !== undefined) movie.web = data.web;
  if (data.status !== undefined) movie.status = data.status;
  if (data.originalLenguage !== undefined)
    movie.originalLenguage = data.originalLenguage;
  if (data.budget !== undefined) movie.budget = parseFloat(data.budget) || 0;
  if (data.revenue !== undefined) movie.revenue = parseFloat(data.revenue) || 0;
  return movie;
};
