import express from 'express'
import UserModel from '../models/user'
import * as crypto from 'crypto';


const hashPassword = (password: string): string => {
    return crypto.createHash('sha256').update(password).digest('hex');
};

export class UserController {
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
        let hashPass = hashPassword(password);


        UserModel.findOne({ 'kor_ime': username, 'lozinka': hashPass }).then(user => {
            res.json(user);
        }).catch((err) => {
            console.log(err);
        })
    }

    getUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;;

        UserModel.findOne({ 'kor_ime': username }).then(user => {
            res.json(user);
        }).catch((err) => {
            console.log(err);
        })
    }

    getUserNames = (req: express.Request, res: express.Response) => {
        let usernames: string[] = [];
        UserModel.find({}).then(users => {
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
        UserModel.find({}).then(users => {
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

    checkPass= (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let oldPass = req.body.oldPass;

        let hashPass = hashPassword(oldPass);

        UserModel.findOne({'kor_ime':username, 'lozinka':hashPass}).then(user => {
            if(user){
                res.json({'message':'ok'});
            }else{
                res.json({'message':'not'});
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    changePass = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let oldPass = req.body.oldPass;
        let newPass = req.body.newPass;

        UserModel.findOneAndUpdate({'kor_ime':username, 'lozinka':oldPass}, {$set:{'lozinka':newPass}}).then(user => {
            res.json(user);
        }).catch((err) => {
            console.log(err);
        })
    }

    update = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let newName = req.body.newName;
        let newSurname = req.body.newSurname;
        let newAddress = req.body.newAddress;
        let newMail = req.body.newMail;
        let newNumber = req.body.newNumber;
        let newCardNumber = req.body.newCardNumber;


        const updateData: any = {
            'ime': newName,
            'prezime': newSurname,
            'adresa': newAddress,
            'mejl': newMail,
            'telefon': newNumber
        };

        UserModel.findOne({ 'kor_ime': username }).then(user => {
            if (user && user.tip === 'vlasnik') {
                updateData['broj_kartice'] = newCardNumber;
            }

            UserModel.findOneAndUpdate({ 'kor_ime': username },{ $set: updateData }).then(ok =>{
                res.json({'message' : 'ok'});
            }).catch((err) => {
                console.log(err);
            })
            
        }).catch((err) => {
            console.log(err);
        })
    }


    getAllByType = (req: express.Request, res: express.Response) => {
        let tip = req.body.tip;

        UserModel.find({'tip':tip}).then(users => {
           res.json(users);
        }).catch((err) => {
            console.log(err);
        })
    }


    updateUserInfo = (req: express.Request, res: express.Response) => {
    
        let oldUser = req.body.oldUser;
        let updatedUser = req.body.updatedUser;

        const updateData: any = {
            'kor_ime':updatedUser.kor_ime,
            'lozinka':updatedUser.lozinka,
            'ime': updatedUser.ime,
            'prezime': updatedUser.prezime,
            'pol':updatedUser.pol,
            'adresa': updatedUser.adresa,
            'telefon': updatedUser.telefon,
            'mejl': updatedUser.mejl,
            'profilna_slika': updatedUser.profilna_slika,
            'broj_kartice': updatedUser.broj_kartice,
            'tip': updatedUser.tip
        };
        
        if (updatedUser.lozinka && updatedUser.lozinka !== oldUser.lozinka) {
            updateData.lozinka = hashPassword(updatedUser.lozinka);
          } else {
            updateData.lozinka = oldUser.lozinka;
          }

        UserModel.findOneAndUpdate({ 'kor_ime': oldUser.kor_ime },{ $set: updateData }).then(ok =>{
            res.json({'message' : 'ok'});
        }).catch((err) => {
            console.log(err);
        })
    }


    addUser = (req: express.Request, res: express.Response) => {
        let user = req.body.user;
        
        let newUser = new UserModel({
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
        })

       newUser.save().then(ok => {
           res.json({'message' : 'ok'});
        }).catch((err) => {
            console.log(err);
        })
    }
}