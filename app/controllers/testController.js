const Test = require("../models/test/testModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/errorHandlers/catchAsync");
const AppError = require("../utils/errorHandlers/AppError");

exports.getTest = catchAsync(async (req, res, next) => {
  const test = await Test.findById(req.params.id);
  if (!test) {
    return next(new AppError("Test not found.", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      test,
    },
  });
});

exports.getAllTests = catchAsync(async (req, res) => {
  const tests = await Test.find();
  res.status(200).json({
    status: "success",
    data: {
      tests,
    },
  });
});

exports.deleteTest = catchAsync(async (req, res) => {
  await Test.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    message: "Deleted successfully.",
  });
});

exports.updateTest = catchAsync(async (req, res, next) => {
  const test = await Test.findById(req.params.id);
  if (!test) return next(new AppError("Test not found.", 404));

  const updatedData = {
    name: req.body.name ?? test.name,
    numberOfQuestions: req.body.numberOfQuestions ?? test.numberOfQuestions,
    testBlocks: req.body.testBlocks ?? test.testBlocks,
    author: req.body.author ?? test.author,
    description: req.body.description ?? test.description,
    numberOfResults: req.body.numberOfResults ?? test.numberOfResults,
    results: req.body.results ?? test.results,
  };

  Object.assign(test, updatedData);
  await test.save({ validateBeforeSave: true });
  res.status(200).json({
    status: "success",
    data: {
      test,
    },
  });
});
exports.createTest = catchAsync(async (req, res) => {
  try {
    const test = await Test.create({
      name: req.body.name,
      numberOfQuestions: req.body.numberOfQuestions,
      testBlocks: req.body.testBlocks,
      author: req.user._id,
      description: req.body.description,
      numberOfResults: req.body.numberOfResults,
      results: req.body.results,
    });

    await User.findByIdAndUpdate(req.user._id, {
      $push: { tests: test._id },
    });

    res.status(201).json({
      status: "success",
      data: {
        test,
      },
    });
  } catch (error) {
    console.error("Error creating test:", error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while creating the test.",
    });
  }
});
exports.getAllTestsExcludingMine = catchAsync(async (req, res, next) => {
  const tests = await Test.find({ author: { $ne: req.user._id } });
  if (!tests || tests.length === 0) {
    return next(new AppError("No tests found", 404));
  }
  res.status(200).json({
    status: "success",
    results: tests.length,
    data: {
      tests,
    },
  });
});
