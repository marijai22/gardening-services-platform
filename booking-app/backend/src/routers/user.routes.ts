import express from 'express'
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res) => new UserController().login(req, res)
)

userRouter.route('/getUser').post(
    (req, res) => new UserController().getUser(req, res)
)

userRouter.route('/getUserNames').get(
    (req, res) => new UserController().getUserNames(req, res)
)

userRouter.route('/getEmail').get(
    (req, res) => new UserController().getEmail(req, res)
)

userRouter.route('/checkPass').post(
    (req, res) => new UserController().checkPass(req, res)
)

userRouter.route('/changePass').post(
    (req, res) => new UserController().changePass(req, res)
)

userRouter.route('/update').post(
    (req, res) => new UserController().update(req, res)
)

userRouter.route('/getAllByType').post(
    (req, res) => new UserController().getAllByType(req, res)
)

userRouter.route('/updateUserInfo').post(
    (req, res) => new UserController().updateUserInfo(req, res)
)

userRouter.route('/addUser').post(
    (req, res) => new UserController().addUser(req, res)
)

export default userRouter;