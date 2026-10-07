import { pool } from "../config/db.connection.js";


export async function searchTitle(search) {
        console.log("SEARCH IN DB:", search);
    const res=await pool.query(`select * 
        from todos 
        where title ILIKE $1 `,
        [`%${search}%`]
    )
    return res.rows;
}

export async function searchBody(search) {
        console.log("SEARCH IN DB:", search);
    const res=await pool.query(`select * 
        from todos 
        where body ILIKE $1 `,
        [`%${search}%`]
    )
    return res.rows;
}