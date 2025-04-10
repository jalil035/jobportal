import userModel from "../Model/UserModel.js";

export const registerService = async (req) => {
  try {
    let reqBody = req.body;
    let data = await userModel.Create(reqBody);
    console.log(data);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "error", error: e };
  }
};
