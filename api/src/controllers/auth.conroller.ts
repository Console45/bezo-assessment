import { ValidationFields } from "./../constants/constant";
import { Request, Response, NextFunction } from "express";
import { controller, post, validate } from "../decorators";
import { authServiceInstance } from "../services/auth";
import { registerSchema } from "../validators/schema";

@controller("/auth")
class AuthController {
  @post("/register")
  @validate({ schema: registerSchema, field: ValidationFields.BODY })
  async handleRegister(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await authServiceInstance.registerUser(req.body);
      res.status(201).json({
        status: "success",
        message: `Registration is successful`,
        data: {
          token,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}
