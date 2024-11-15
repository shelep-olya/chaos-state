const mongoose = require("mongoose");

const testBlockSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Please enter question."],
    },
    answers: {
      type: [String],
      required: [true, "Please enter answers."],
      validate: [arrayLimit, "A question must have exactly 3 answers."],
    },
  },
  {
    versionKey: false,
  }
);

function arrayLimit(val) {
  return val.length === 3;
}

module.exports = testBlockSchema;
