import dotenv from "dotenv";
dotenv.config();

console.log("PGDATABASE:", process.env.PGDATABASE);
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PORT:", process.env.PORT);