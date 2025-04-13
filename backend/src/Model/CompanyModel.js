import mongoose from "mongoose";

const CompanySchema = mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    website: {
      type: String,
    },
    location: {
      type: String,
    },
    logo: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User',
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const CompanyModel = mongoose.model("companies", CompanySchema);

export default CompanyModel;
