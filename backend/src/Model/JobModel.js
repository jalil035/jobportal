import mongoose, { version } from "mongoose";

const JobSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirement: {
      type: String,
    },
    salary: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    applications: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "applications",
    },
  },
  { timestamps: true, versionKey: false }
);

const jobModel = mongoose.model("jobs", JobSchema);

export default jobModel;
