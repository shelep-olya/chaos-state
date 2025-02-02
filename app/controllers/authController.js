const User = require("../models/userModel");
const AppError = require("../utils/errorHandlers/AppError");
const catchAsync = require("../utils/errorHandlers/catchAsync");
const jwt = require("jsonwebtoken");
const { promisify } = require("node:util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;
  console.log("Generated Token:", token);
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    return next(
      new AppError("User already has an account. Please try to log in.", 409)
    );
  }
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
  });
  createAndSendToken(newUser, 201, res);
});

exports.signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide email and password.", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  // const user = await User.findOne({ email }, { password: 1 });
  // const user = await User.findOne({ email }).select({_id:false, password: 1 });
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password.", 401));
  }
  createAndSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log("Decoded Token:", decoded); // Log the decoded token for debugging

  const currentUser = await User.findById(decoded.id);
  console.log("Current User:", currentUser);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  req.user = currentUser;
  next();
});

exports.signout = catchAsync(async (req, res) => {
  const cookieOptions = {
    expires: new Date(Date.now() - 1000),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", "", cookieOptions);

  res.status(200).json({
    status: "success",
    message: "Signed out successfully.",
  });
});
