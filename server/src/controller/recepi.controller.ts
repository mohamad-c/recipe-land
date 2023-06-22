import { Response, NextFunction } from "express";
import { recepiModel } from "../model/recepi.model";
import { RecepiModelProps } from "../utils/interfaces";

export default class RecepiController {
  async createRecepi(req: any, res: Response, next: NextFunction) {
    try {
      const {
        title,
        description,
        category,
        cookingTime,
        cuisine,
        difficulty,
        ingredients,
        instructions,
        likes,
        preparationTime,
        totalTime,
      } = req.body as RecepiModelProps;
      await recepiModel.create({
        title,
        description,
        category,
        cookingTime,
        cuisine,
        difficulty,
        ingredients,
        instructions,
        likes,
        preparationTime,
        totalTime,
        creator: req.user.id,
      });
      const creator = await recepiModel.find({ title }).populate('creator').exec();
      res.status(201).send(creator);
    } catch (error) {
      next(error);
    }
  }
}
