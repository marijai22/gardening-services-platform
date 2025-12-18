import express from 'express'
import ZahtevModel from '../models/zahtevReg'
import multer from 'multer'
import path from 'path'
import * as crypto from 'crypto';
// podezsavanje gde cemo cuvati slike multer.diskStorage - destination, filename - kako ce da se cuva

// otpremi - dohvata sliku sa racunara i stavlja u backend - jpg, png


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Фасцикла у коју ће бити сачуване слике
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}${ext}`); // Име слике ће бити време у милисекундама + екстензија
    }
  });


  const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpg|png/;  // Дозвољени типови фајлова
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Samo slike su dozvoljene!'));
        }
    }
  });



const hashPassword = (password: string): string => {
    return crypto.createHash('sha256').update(password).digest('hex');
};

export class ZahtevController{
    register = (req: express.Request, res: express.Response) => {
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



        let zahtev = new ZahtevModel({
            kor_ime:username,
            lozinka: hashPassword(password),
            ime: name,
            prezime: surname,
            pol: pol,
            adresa: address,
            telefon: number,
            mejl: email,
            profilna_slika: profilePicture,
            broj_kartice: cardNumber,
            tip:tip,
            status: status
        })


        zahtev.save().then(ok =>{
            res.json({'message': 'ok'});
        }).catch((err)=>{
            console.log(err);
        })
    }


    
    upload = (req: express.Request, res: express.Response) => {
        upload.single('image')(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ error: 'File upload error' });
            } else if (err) {
                return res.status(500).json({ error: 'Internal server error' });
            }
    
            if (!req.file) {
                return res.status(400).json({ message: 'Nije poslata slika' });
            }
    
            const fileName = req.file.filename;
            return res.status(200).json({ message: 'ok', filePath: fileName });
            });
    }

    getAllByStatus = (req: express.Request, res: express.Response) => {
        let status = req.body.status;

        ZahtevModel.find({'status':status}).then(reqs => {
            res.json(reqs);
        }).catch((err) => {
            console.log(err);
        })
    }

    removeUser= (req: express.Request, res: express.Response) => {
        let user = req.body.user;

        ZahtevModel.findOneAndDelete({'kor_ime':user.kor_ime}).then(reqs => {
            res.json({'message':'ok'});
        }).catch((err) => {
            console.log(err);
        })
    }

    getUserNames = (req: express.Request, res: express.Response) => {
        let usernames: string[] = [];
        ZahtevModel.find({'status':'neobradjen'}).then(users => {
            users.forEach(user => {
                if (user) {
                    usernames.push(String(user.kor_ime));
                }
            });

            res.json(usernames);
        }).catch((err) => {
            console.log(err);
        })
    }

    getEmail= (req: express.Request, res: express.Response) => {
        let emails: string[] = [];
        ZahtevModel.find({'status':'neobradjen'}).then(users => {
            users.forEach(user => {
                if (user) {
                    emails.push(String(user.mejl));
                }
            });

            res.json(emails);
        }).catch((err) => {
            console.log(err);
        })
    }

    deny= (req: express.Request, res: express.Response) => {
        let user = req.body.user;

        ZahtevModel.findOneAndUpdate({'kor_ime':user.kor_ime}, {$set:{'status':'odbijen'}}).then(ok => {
             res.json({'message':'ok'});
        }).catch((err) => {
            console.log(err);
        })
    }

    getDeniedUsernames= (req: express.Request, res: express.Response) => {
        let usernames: string[] = [];

        ZahtevModel.find({'status':'odbijen'}).then(users => {
            users.forEach(user => {
                if (user) {
                    usernames.push(String(user.kor_ime));
                }
            });
            res.json(usernames);
        }).catch((err) => {
            console.log(err);
        })
    }

    getDeniedEmails= (req: express.Request, res: express.Response) => {
        let emails: string[] = [];

        ZahtevModel.find({'status':'odbijen'}).then(users => {
            users.forEach(user => {
                if (user) {
                    emails.push(String(user.mejl));
                }
            });
            res.json(emails);
        }).catch((err) => {
            console.log(err);
        })
    }
}