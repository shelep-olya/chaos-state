const User = require("../models/userModel");
const catchAsync = require("../utils/errorHandlers/catchAsync");
const AppError = require("../utils/errorHandlers/AppError");

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const { email } = req.query;
  if (!email) {
    return next(new AppError("Email is required to fetch username", 400));
  }

  const user = await User.findOne({ email }).select("+name");
  if (!user) {
    return next(new AppError("No user found with this email", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  await User.findByIdAndUpdate(req.params.id);
  res.status(204).json({
    status: "success",
    message: "Deleted successfully.",
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError("User not found.", 404));
  const updatedData = {
    name: req.body.name ?? user.name,
    status: req.body.status ?? user.status,
  };
  Object.assign(user, updatedData);
  await user.save({ validateBeforeSave: true });

  res.status(200).json({
    status: "success",
    data: {
      user: user,
    },
  });
});

exports.getMyTests = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return next(new AppError("Unauthorized", 401));
  }

  const userId = req.user._id;
  const user = await User.findById(userId).populate(
    "tests",
    "name description"
  );

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      tests: user.tests || [],
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
