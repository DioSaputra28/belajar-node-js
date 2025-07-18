import express from "express"
import userController from "../controller/user-controller.js";

const publicRouter = express.Router()
publicRouter.post("/api/users", userController.register);

export {
    publicRouter
}