import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import productsRoutes from './routes/productsRoutes.js';
import { sql } from './config/db.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRoutes);

async function initDB() {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;

        await sql`
            ALTER TABLE products
            ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        `;
        console.log("Database initialized successfully.");
    } catch (error) {
        console.log("Error initDB:", error);
    }
}

const PORT = process.env.PORT || 5000;

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`The backend runs on port: ${PORT}`)
    });
})