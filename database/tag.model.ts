import { Schema, model, models, Document } from "mongoose";

export interface ITag extends Document {
  name: string;
  description: string;
  question: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
  createdOn: Date;
}

const TagSchema = new Schema<ITag>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  question: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdOn: { type: Date, default: Date.now },
});

// check if model exists otherwise create one.
const Tag = models.Tag || model("Tag", TagSchema);

export default Tag;
