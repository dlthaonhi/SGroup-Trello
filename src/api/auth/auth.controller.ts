import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { authService } from "./auth.service";
import { User } from "../../model/user.entity";
import { ResponseStatus } from "../../services/serviceResponse";
import { Login } from "./auth.interface";
import { handleServiceResponse } from "../../services/httpHandlerResponse";

export const AuthController = {
  async register(req: Request, res: Response){
    const userData: User = req.body;
    try {
      const serviceResponse = await authService.register(userData);
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error creating user: ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
  async login(req: Request, res: Response) {
    const loginData: Login = req.body;
    try {
      const serviceResponse = await authService.login(loginData);
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: "Failed",
        message: "Error logging in",
        error: (error as Error).message,
      });
    }
  },
  async getUser(req: Request, res: Response) {
    const userId = req.params.id;
    try {
      const serviceResponse = await authService.getUser(userId);
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error getting user: ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },

  async updateRoleUser(req: Request, res: Response) {
    const userId = req.params.id;
    const roleName = req.body.roleName;
    try {
      const serviceResponse = await authService.updateRoleUser(userId, roleName);
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error updating role user: ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  }
};