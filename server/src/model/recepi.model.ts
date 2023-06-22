import { Schema, Types, model } from "mongoose";

const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    ingredients: [{ type: String }],
    instructions: [{ type: String }],
    preparationTime: { type: Number },
    cookingTime: { type: Number },
    totalTime: { type: Number },
    difficulty: { type: String },
    cuisine: { type: String },
    category: { type: String },
    // image: { type: String },
    likes: { type: Number, default: 0 },
    creator: { type: Types.ObjectId, ref: 'users' },
  },
  { timestamps: true }
);

export const recepiModel = model("recepies", recipeSchema);
