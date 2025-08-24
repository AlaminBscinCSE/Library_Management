import Path from "path";

import dotenv, { config } from "dotenv";

dotenv.config({ path: Path.join(process.cwd(), ".env") });

export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
}; 

console.log(config);