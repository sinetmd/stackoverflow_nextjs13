"use server";

import Question from "@/database/question.modal";
import { connectToDatabase } from "../mongoose";
import { CreateQuestionParams, GetQuestionsParams } from "./shared.types";
import User from "@/database/user.modal";
import { revalidatePath } from "next/cache";
import Tag from "@/database/tag.modal";

export async function getQuestions(params: GetQuestionsParams) {
  try {
    // connect to db
    connectToDatabase();

    const questions = await Question.find({})
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });

    return { questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    // connect to db
    connectToDatabase();

    // get elements from question page using params
    const { title, content, tags, author, path } = params;

    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    // create tags or get them if they already exists
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { question: question._id } },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      // push the tags into the question
      $push: { tags: { $each: tagDocuments } },
    });

    //  Create an interaction record for the user's ask_question action

    // Increment author's reputation by +5 points for creating a question

    // purges the cache of the given path
    revalidatePath(path);
  } catch (error) {}
}
