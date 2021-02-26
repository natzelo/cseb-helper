const userProgress = (households) => {
  const total_no_of_houses = households.length;

  let no_of_houses_left = 0;
  let list_of_houses_left = [];

  for (let i = 0; i < total_no_of_houses; i++) {
    if (households[i].roundStatus === true) {
      no_of_houses_left++;
      list_of_houses_left.push(households[i]);
    }
  }

  const progress =
    ((total_no_of_houses - no_of_houses_left) / total_no_of_houses) * 100;
  return { progress, leftHouses: list_of_houses_left };
};

module.exports = userProgress;
