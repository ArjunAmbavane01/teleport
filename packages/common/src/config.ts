import dotenv from 'dotenv';
import path from 'path';

// we need to do this because consumign app searches the .env in its root (eg: web searches in apps/web)
const envPath = path.resolve("./node_modules/@workspace/common/.env");
dotenv.config({ path: envPath });


export const JWT_SECRET = process.env.JWT_SECRET!; 