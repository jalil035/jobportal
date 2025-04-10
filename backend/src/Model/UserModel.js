import mongoose, { version } from "mongoose";

const UserSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    PhoneNumber: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      enum: ["employ", "recruiter"],
      require: true,
    },
    // profile: {
    //   bio: { type: String },
    //   skills: [{ type: String }],
    //   resume: { type: String },
    //   company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    //   profilePhoto: {
    //     type: String,
    //     default: "",
    //   },
    // },
  },
  { timestamps: true, versionKey: false }
);

const userModel = mongoose.model("users", UserSchema);

export default userModel;
