import mongoose, { Schema } from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, require: true },
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("note", NoteSchema);
