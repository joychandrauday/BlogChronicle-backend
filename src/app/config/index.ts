import dotenv from 'dotenv';
import path from 'path';

// Load the .env file
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT || 3000, // Default to 3000 if not specified
  database_url: process.env.DB_URL, // Make sure DB_URL is in your .env file
};
