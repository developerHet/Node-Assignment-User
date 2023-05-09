const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");




exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({
    success: true,
    data: user,
  });
});

exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    data: users,
  });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;


  const user = await User.findById(id);
  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }


  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  var user = await User.findById(id);
  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }

  user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;


  var user = await User.findById(id);
  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }

  await User.findByIdAndDelete(id);

  res.status(204).json({
    success: true,
    data: {},
  });
});


