import { Document } from "mongodb";
import { Schema, model, models } from "mongoose";

export interface IInteraction extends Document {
  user: Schema.Types.ObjectId; // ref to user
  action: string;
  question: Schema.Types.ObjectId; // ref to question
  answer: Schema.Types.ObjectId; // ref to answer
  tags: Schema.Types.ObjectId;
  createdAt: Date;
}

const InteractionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true },
  question: { type: Schema.Types.ObjectId, ref: "Question" },
  answer: { type: Schema.Types.ObjectId, ref: "Answer" },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  createdAt: { type: Date, default: Date.now },
});

const Interaction =
  models.Interaction || model("Interaction", InteractionSchema);

export default Interaction;
