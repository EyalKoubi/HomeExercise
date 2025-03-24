"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const customerRoutes_1 = __importDefault(require("./routers/customerRoutes"));
const generateCustomers_1 = require("./utils/generateCustomers");
const authRoutes_1 = __importDefault(require("./routers/authRoutes"));
const authMiddleware_1 = require("./middleware/authMiddleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
// Enable CORS and JSON body parsing
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Public route for login
app.use("/api/login", authRoutes_1.default);
// Protected route for customer operations
app.use("/api/customers", authMiddleware_1.authenticate, customerRoutes_1.default);
// Connect to MongoDB and generate customers if needed
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("✅ Connected to MongoDB");
    // Seed database with 1000 fake customers if collection is empty
    yield (0, generateCustomers_1.generateFakeCustomers)();
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}))
    .catch((error) => {
    console.error("❌ MongoDB connection failed:", error.message);
});
