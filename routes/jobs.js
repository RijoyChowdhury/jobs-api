const express = require("express");
const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs.controller");

const Router = express.Router();

Router.route("/").post(createJob).get(getAllJobs);
Router.route("/:id").get(getJob).delete(deleteJob).patch(updateJob);

module.exports = Router;
