import { Response, NextFunction, Request } from "express";
import { recepiModel } from "../model/recepi.model";
import { RecepiModelProps, ResponseModel } from "../utils/interfaces";
import { ObjectId } from "mongodb";
export default class RecepiController {
  async createRecepi(
    req: any,
    res: Response<ResponseModel<RecepiModelProps | unknown>>,
    next: NextFunction
  ) {
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
      const creator: RecepiModelProps | unknown = await recepiModel
        .find({ title })
        .populate("creator")
        .exec();
      res.status(201).json({
        error: false,
        statusCode: 201,
        message: "Created",
        data: creator,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllRecepies(
    req: any,
    res: Response<ResponseModel<RecepiModelProps | unknown>>,
    next: NextFunction
  ) {
    try {
      const recepies: RecepiModelProps | unknown = await recepiModel.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "creator",
            foreignField: "_id",
            as: "creator",
          },
        },
      ]);
      res.status(200).json({
        error: false,
        statusCode: 200,
        message: "Success",
        data: recepies,
      });
    } catch (error) {
      next(error);
    }
  }

  async getRecepieById(
    req: any,
    res: Response<ResponseModel<RecepiModelProps | unknown>>,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const singleRecepi = await recepiModel.aggregate([
        {
          $match: { _id: new ObjectId(id) },
        },
        {
          $lookup: {
            from: "users",
            localField: "creator",
            foreignField: "_id",
            as: "creator",
          },
        },
      ]);
      if (singleRecepi.length !== 0) {
        res.status(200).json({
          error: false,
          statusCode: 200,
          message: "Success",
          data: singleRecepi,
        });
      } else {
        throw { status: 404, message: "Recipe does not exist" };
      }
    } catch (error) {
      next(error);
    }
  }

  async deleteRecepi(
    req: any,
    res: Response<ResponseModel<RecepiModelProps | unknown>>,
    next: NextFunction
  ) {
    try {
      const { id } = req.user;
      const { recipeId } = req.params;
      const recipe = await recepiModel.findById(recipeId);
      if (!recipe) {
        res.status(404).json({
          error: true,
          statusCode: 404,
          message: "No Recipe Found",
          data: [],
        });
        //! stop the next if check and other operations...
        return;
      }
      if (id === recipe?.creator?.toString()) {
        const deletedRecipe = await recepiModel.deleteOne({ _id: recipeId });
        res.status(201).json({
          error: false,
          statusCode: 201,
          message: "Deleted Successfuly",
          data: deletedRecipe,
        });
      } else throw { statusCode: 400, message: "Access denied" };
    } catch (error) {
      next(error);
    }
  }

  async updateRecepi(
    req: any,
    res: Response<ResponseModel<RecepiModelProps | unknown>>,
    next: NextFunction
  ) {
    try {
      const { id } = req.user;
      const { recipeId } = req.params;
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
      const recipe = await recepiModel.findById(recipeId);
      if (!recipe) {
        res.status(404).json({
          error: true,
          statusCode: 404,
          message: "No Recipe Found",
          data: [],
        });
        //! stop the next if check and other operations...
        return;
      }
      if (id === recipe?.creator?.toString()) {
        const updatedRecipe = await recepiModel.updateOne(
          { _id: recipeId },
          {
            $set: {
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
            },
          }
        );
        res.status(201).json({
          error: false,
          statusCode: 201,
          message: "Updated Successfuly",
          data: updatedRecipe,
        });
      } else throw { statusCode: 400, message: "Access denied" };
    } catch (error) {
      next(error);
    }
  }
}
