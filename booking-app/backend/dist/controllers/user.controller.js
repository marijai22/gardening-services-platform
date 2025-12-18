"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
const crypto = __importStar(require("crypto"));
const hashPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
};
class UserController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let hashPass = hashPassword(password);
            user_1.default.findOne({ 'kor_ime': username, 'lozinka': hashPass }).then(user => {
                res.json(user);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.getUser = (req, res) => {
            let username = req.body.username;
            ;
            user_1.default.findOne({ 'kor_ime': username }).then(user => {
                res.json(user);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.getUserNames = (req, res) => {
            let usernames = [];
            user_1.default.find({}).then(users => {
                users.forEach(user => {
                    if (user) {
                        usernames.push(String(user.kor_ime));
                    }
                });
                res.json(usernames);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.getEmail = (req, res) => {
            let emails = [];
            user_1.default.find({}).then(users => {
                users.forEach(user => {
                    if (user) {
                        emails.push(String(user.mejl));
                    }
                });
                res.json(emails);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.checkPass = (req, res) => {
            let username = req.body.username;
            let oldPass = req.body.oldPass;
            let hashPass = hashPassword(oldPass);
            user_1.default.findOne({ 'kor_ime': username, 'lozinka': hashPass }).then(user => {
                if (user) {
                    res.json({ 'message': 'ok' });
                }
                else {
                    res.json({ 'message': 'not' });
                }
            }).catch((err) => {
                console.log(err);
            });
        };
        this.changePass = (req, res) => {
            let username = req.body.username;
            let oldPass = req.body.oldPass;
            let newPass = req.body.newPass;
            user_1.default.findOneAndUpdate({ 'kor_ime': username, 'lozinka': oldPass }, { $set: { 'lozinka': newPass } }).then(user => {
                res.json(user);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.update = (req, res) => {
            let username = req.body.username;
            let newName = req.body.newName;
            let newSurname = req.body.newSurname;
            let newAddress = req.body.newAddress;
            let newMail = req.body.newMail;
            let newNumber = req.body.newNumber;
            let newCardNumber = req.body.newCardNumber;
            const updateData = {
                'ime': newName,
                'prezime': newSurname,
                'adresa': newAddress,
                'mejl': newMail,
                'telefon': newNumber
            };
            user_1.default.findOne({ 'kor_ime': username }).then(user => {
                if (user && user.tip === 'vlasnik') {
                    updateData['broj_kartice'] = newCardNumber;
                }
                user_1.default.findOneAndUpdate({ 'kor_ime': username }, { $set: updateData }).then(ok => {
                    res.json({ 'message': 'ok' });
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        };
        this.getAllByType = (req, res) => {
            let tip = req.body.tip;
            user_1.default.find({ 'tip': tip }).then(users => {
                res.json(users);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.updateUserInfo = (req, res) => {
            let oldUser = req.body.oldUser;
            let updatedUser = req.body.updatedUser;
            const updateData = {
                'kor_ime': updatedUser.kor_ime,
                'lozinka': updatedUser.lozinka,
                'ime': updatedUser.ime,
                'prezime': updatedUser.prezime,
                'pol': updatedUser.pol,
                'adresa': updatedUser.adresa,
                'telefon': updatedUser.telefon,
                'mejl': updatedUser.mejl,
                'profilna_slika': updatedUser.profilna_slika,
                'broj_kartice': updatedUser.broj_kartice,
                'tip': updatedUser.tip
            };
            if (updatedUser.lozinka && updatedUser.lozinka !== oldUser.lozinka) {
                updateData.lozinka = hashPassword(updatedUser.lozinka);
            }
            else {
                updateData.lozinka = oldUser.lozinka;
            }
            user_1.default.findOneAndUpdate({ 'kor_ime': oldUser.kor_ime }, { $set: updateData }).then(ok => {
                res.json({ 'message': 'ok' });
            }).catch((err) => {
                console.log(err);
            });
        };
        this.addUser = (req, res) => {
            let user = req.body.user;
            let newUser = new user_1.default({
                kor_ime: user.kor_ime,
                lozinka: user.lozinka,
                ime: user.ime,
                prezime: user.prezime,
                pol: user.pol,
                adresa: user.adresa,
                telefon: user.telefon,
                mejl: user.mejl,
                profilna_slika: user.profilna_slika,
                broj_kartice: user.broj_kartice,
                tip: user.tip
            });
            newUser.save().then(ok => {
                res.json({ 'message': 'ok' });
            }).catch((err) => {
                console.log(err);
            });
        };
    }
}
exports.UserController = UserController;
