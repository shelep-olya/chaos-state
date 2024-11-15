const Test = require("../models/test/testModel");
const catchAsync = require("../utils/errorHandlers/catchAsync");
const resultsHandler =
  require("../utils/testFeatures/testFeature").resultsHandler;

exports.getResults = catchAsync(async (req, res) => {
  const test = await Test.findById(req.params.testId);
  if (!test) {
    return res.status(404).json({ status: "fail", message: "Test not found." });
  }
  if (!test.results) {
    return res
      .status(404)
      .json({ status: "fail", message: "No results found." });
  }
  resultsHandler(req, res, test.results, req.params.testId);
});
