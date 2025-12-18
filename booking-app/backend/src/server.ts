import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routers/user.routes';
import zahtevRouter from './routers/zahtevReg.routes';
import path from 'path'

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/projekat2024');
const connection = mongoose.connection;
connection.once('open', () =>{
    console.log("db connected");
})

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const router = express.Router();
router.use('/user', userRouter);
router.use('/zahtevReg', zahtevRouter);

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));