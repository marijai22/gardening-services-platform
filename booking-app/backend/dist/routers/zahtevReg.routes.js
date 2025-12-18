"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zahtev_controller_1 = require("../controllers/zahtev.controller");
const zahtevRouter = express_1.default.Router();
zahtevRouter.route('/register').post((req, res) => new zahtev_controller_1.ZahtevController().register(req, res));
zahtevRouter.route('/upload').post((req, res) => new zahtev_controller_1.ZahtevController().upload(req, res));
zahtevRouter.route('/getAllByStatus').post((req, res) => new zahtev_controller_1.ZahtevController().getAllByStatus(req, res));
zahtevRouter.route('/removeUser').post((req, res) => new zahtev_controller_1.ZahtevController().removeUser(req, res));
zahtevRouter.route('/getUserNames').get((req, res) => new zahtev_controller_1.ZahtevController().getUserNames(req, res));
zahtevRouter.route('/getEmail').get((req, res) => new zahtev_controller_1.ZahtevController().getEmail(req, res));
zahtevRouter.route('/deny').post((req, res) => new zahtev_controller_1.ZahtevController().deny(req, res));
zahtevRouter.route('/getDeniedUsernames').get((req, res) => new zahtev_controller_1.ZahtevController().getDeniedUsernames(req, res));
zahtevRouter.route('/getDeniedEmails').get((req, res) => new zahtev_controller_1.ZahtevController().getDeniedEmails(req, res));
exports.default = zahtevRouter;
