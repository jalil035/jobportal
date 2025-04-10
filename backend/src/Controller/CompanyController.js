import CompanyModel from "../Model/CompanyModel.js";

export const registerCompany = async (req, res) => {
  try {
    console.log(req.body);

    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company Name is required",
        success: false,
      });
    }
    
    // check if company already exists
    let company = await CompanyModel.findOne({ name: companyName }); // Fixed field name
    if (company) {
      return res.status(400).json({
        message: "Company Already Exists",
        success: false,
      });
    }

    // create a new company
    company = await CompanyModel.create({
      name: companyName, // Fixed field name
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company Registered Successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get All Companies
export const getCompany = async (req, res) => {
  try {
    const userID = req.id;
    const companies = await CompanyModel.find({ userId: userID }); // Fixed field name
    if (!companies) {
      return res.status(404).json({
        message: "Company Not Found",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get Company by ID
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await CompanyModel.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Update Company
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    // এখানে cloudinary আসবে (ফাইল আপলোডের জন্য)

    // Update Company Data
    const updateData = { name, description, website, location };
    const company = await CompanyModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company Updated Successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
