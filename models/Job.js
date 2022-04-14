const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please specify company"],
    },
    position: {
      type: String,
      required: [true, "Please specify position in company"],
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User id missing"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
