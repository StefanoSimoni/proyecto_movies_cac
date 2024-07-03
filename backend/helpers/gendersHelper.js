export const parseGender = (data) => {
    const gender = {
      id: parseInt(data.id),
      ...data
    };
    return gender;
  };
  
  export const parsePartialGender = (data) => {
    const gender = {};
    if (data.gender !== undefined) gender.gender = data.gender;
    return gender;
  };
  