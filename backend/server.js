import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import productsRoutes from './routes/productsRoutes.js';
import { sql } from './config/db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    // '/{*any}'
    app.get('/{*splat}', (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist" ,"index.html"));
    });
}

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

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`The backend runs on port: ${PORT}`)
    });
})