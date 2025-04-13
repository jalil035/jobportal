import jobModel from "../Model/JobModel.js";
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirement,
      salary,
      experienceLevel,
      location,
      jobType,
      position,
      companyID,
    } = req.body;
    const UserId = req.id;

    if (
      !title ||
      !description ||
      !requirement ||
      !salary ||
      !experienceLevel ||
      !location ||
      !jobType ||
      !position ||
      !companyID
    ) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const job = await jobModel.create({
      title,
      description,
      requirement: requirement.split(","),
      salary: Number(salary),
      experienceLevel: Number(experienceLevel),
      location,
      jobType,
      position,
      company: companyID,
      created_by: UserId,
    });
    return res.status(200).json({
      message: "Job posted successfully",
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getJob = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await jobModel.find({ query });
    if (!jobs) {
      return res.status(400).json({
        message: "No jobs found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await jobModel.findById(jobId);
    if (!job) {
      return res.status(400).json({
        message: "job Not Found",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await jobModel.find({ created_by: adminId });
    if (!jobs) {
      return res.status(400).json({
        message: "No Jobs Found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateJob = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
