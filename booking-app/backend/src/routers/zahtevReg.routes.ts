import express from 'express'
import { ZahtevController } from '../controllers/zahtev.controller';

const zahtevRouter = express.Router();

zahtevRouter.route('/register').post(
    (req, res) => new ZahtevController().register(req, res)
)

zahtevRouter.route('/upload').post(
    (req, res) => new ZahtevController().upload(req, res)
)

zahtevRouter.route('/getAllByStatus').post(
    (req, res) => new ZahtevController().getAllByStatus(req, res)
)

zahtevRouter.route('/removeUser').post(
    (req, res) => new ZahtevController().removeUser(req, res)
)

zahtevRouter.route('/getUserNames').get(
    (req, res) => new ZahtevController().getUserNames(req, res)
)


zahtevRouter.route('/getEmail').get(
    (req, res) => new ZahtevController().getEmail(req, res)
)

zahtevRouter.route('/deny').post(
    (req, res) => new ZahtevController().deny(req, res)
)

zahtevRouter.route('/getDeniedUsernames').get(
    (req, res) => new ZahtevController().getDeniedUsernames(req, res)
)

zahtevRouter.route('/getDeniedEmails').get(
    (req, res) => new ZahtevController().getDeniedEmails(req, res)
)

export default zahtevRouter;