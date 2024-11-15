const shuffleArray = (array) => {
  let shuffledArray = array.slice();

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

exports.resultsHandler = (req, res, results, id) => {
  const shuffledResults = shuffleArray(results);
  const randomIndex = Math.floor(Math.random() * shuffledResults.length);
  const response = shuffledResults[randomIndex];

  res.status(200).json({
    status: "success",
    data: response,
  });
};
