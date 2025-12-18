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
exports.ZahtevController = void 0;
const zahtevReg_1 = __importDefault(require("../models/zahtevReg"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const crypto = __importStar(require("crypto"));
// podezsavanje gde cemo cuvati slike multer.diskStorage - destination, filename - kako ce da se cuva
// otpremi - dohvata sliku sa racunara i stavlja u backend - jpg, png
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Фасцикла у коју ће бити сачуване слике
    },
    filename: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`); // Име слике ће бити време у милисекундама + екстензија
    }
});
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpg|png/; // Дозвољени типови фајлова
        const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        }
        else {
            cb(new Error('Samo slike su dozvoljene!'));
        }
    }
});
const hashPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
};
class ZahtevController {
    constructor() {
        this.register = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let name = req.body.name;
            let surname = req.body.surname;
            let pol = req.body.pol;
            let address = req.body.address;
            let number = req.body.number;
            let email = req.body.email;
            let profilePicture = req.body.profilePicture;
            let cardNumber = req.body.cardNumber;
            let tip = "vlasnik";
            let status = "neobradjen";
            let zahtev = new zahtevReg_1.default({
                kor_ime: username,
                lozinka: hashPassword(password),
                ime: name,
                prezime: surname,
                pol: pol,
                adresa: address,
                telefon: number,
                mejl: email,
                profilna_slika: profilePicture,
                broj_kartice: cardNumber,
                tip: tip,
                status: status
            });
            zahtev.save().then(ok => {
                res.json({ 'message': 'ok' });
            }).catch((err) => {
                console.log(err);
            });
        };
        this.upload = (req, res) => {
            upload.single('image')(req, res, (err) => {
                if (err instanceof multer_1.default.MulterError) {
                    return res.status(400).json({ error: 'File upload error' });
                }
                else if (err) {
                    return res.status(500).json({ error: 'Internal server error' });
                }
                if (!req.file) {
                    return res.status(400).json({ message: 'Nije poslata slika' });
                }
                const fileName = req.file.filename;
                return res.status(200).json({ message: 'ok', filePath: fileName });
            });
        };
        this.getAllByStatus = (req, res) => {
            let status = req.body.status;
            zahtevReg_1.default.find({ 'status': status }).then(reqs => {
                res.json(reqs);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.removeUser = (req, res) => {
            let user = req.body.user;
            zahtevReg_1.default.findOneAndDelete({ 'kor_ime': user.kor_ime }).then(reqs => {
                res.json({ 'message': 'ok' });
            }).catch((err) => {
                console.log(err);
            });
        };
        this.getUserNames = (req, res) => {
            let usernames = [];
            zahtevReg_1.default.find({ 'status': 'neobradjen' }).then(users => {
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
            zahtevReg_1.default.find({ 'status': 'neobradjen' }).then(users => {
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
        this.deny = (req, res) => {
            let user = req.body.user;
            zahtevReg_1.default.findOneAndUpdate({ 'kor_ime': user.kor_ime }, { $set: { 'status': 'odbijen' } }).then(ok => {
                res.json({ 'message': 'ok' });
            }).catch((err) => {
                console.log(err);
            });
        };
        this.getDeniedUsernames = (req, res) => {
            let usernames = [];
            zahtevReg_1.default.find({ 'status': 'odbijen' }).then(users => {
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
        this.getDeniedEmails = (req, res) => {
            let emails = [];
            zahtevReg_1.default.find({ 'status': 'odbijen' }).then(users => {
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
    }
}
exports.ZahtevController = ZahtevController;
