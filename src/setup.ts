import dotenv from "dotenv";

const envFile = process.env.NODE_ENV === "teste" ? '.env.test' : '.env';

dotenv.config({
    path: envFile
});