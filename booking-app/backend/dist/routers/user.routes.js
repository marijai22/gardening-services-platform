"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
userRouter.route('/login').post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter.route('/getUser').post((req, res) => new user_controller_1.UserController().getUser(req, res));
userRouter.route('/getUserNames').get((req, res) => new user_controller_1.UserController().getUserNames(req, res));
userRouter.route('/getEmail').get((req, res) => new user_controller_1.UserController().getEmail(req, res));
userRouter.route('/checkPass').post((req, res) => new user_controller_1.UserController().checkPass(req, res));
userRouter.route('/changePass').post((req, res) => new user_controller_1.UserController().changePass(req, res));
userRouter.route('/update').post((req, res) => new user_controller_1.UserController().update(req, res));
userRouter.route('/getAllByType').post((req, res) => new user_controller_1.UserController().getAllByType(req, res));
userRouter.route('/updateUserInfo').post((req, res) => new user_controller_1.UserController().updateUserInfo(req, res));
userRouter.route('/addUser').post((req, res) => new user_controller_1.UserController().addUser(req, res));
exports.default = userRouter;
