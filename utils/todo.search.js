import { pool } from "../config/db.connection.js";


export async function searchBoth(search) {
    const res = await pool.query(
        `SELECT * FROM todos 
         WHERE title ILIKE $1 OR body ILIKE $1 
         ORDER BY id ASC`,
        [`%${search}%`]
    );
    return res.rows;
}