"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_routes_1 = __importDefault(require("./routers/user.routes"));
const zahtevReg_routes_1 = __importDefault(require("./routers/zahtevReg.routes"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
mongoose_1.default.connect('mongodb://127.0.0.1:27017/projekat2024');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log("db connected");
});
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
const router = express_1.default.Router();
router.use('/user', user_routes_1.default);
router.use('/zahtevReg', zahtevReg_routes_1.default);
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
