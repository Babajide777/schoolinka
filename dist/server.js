"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const corsOptions_1 = __importDefault(require("./utils/corsOptions"));
const db_1 = __importDefault(require("./config/db"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use((0, cors_1.default)(corsOptions_1.default));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
//routes
app.get("/", (req, res) => {
    res.send("Medical departure server running");
});
db_1.default
    .sync({ force: false })
    .then(() => {
    console.log("Connection has been established successfully.");
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
})
    .catch((error) => {
    console.error("Unable to connect to the database: ", error);
});
