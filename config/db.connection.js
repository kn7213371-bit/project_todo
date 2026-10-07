import { Pool } from "pg";


export const pool=new Pool({
    host:process.env.PGHOST,
    port:process.env.PGPORT,
    user:process.env.PGUSER,
    password:process.env.PGPASSWORD,
    database:process.env.PGDATABASE
});

export async function connectDB() {
    try{
    const client = await pool.connect();

    console.log("Database connected successfully");

    client.release();
    }catch(err){
    console.error("Database connection failed: ", error.message);
    process.exit(1);
    }
}




