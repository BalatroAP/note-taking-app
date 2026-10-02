import mongoose from "mongoose";

const schemaInfo = {
  type: String,
  required: true,
};

const UserSchema = new mongoose.Schema(
  {
    username: schemaInfo,
    email: schemaInfo,
    password: schemaInfo,
  },
  { timestamps: true },
);

export default mongoose.model("User", UserSchema);
