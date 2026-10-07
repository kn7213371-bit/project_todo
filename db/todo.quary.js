import {pool} from "../config/db.connection.js";


export async function getTodoAll() {
    const res=await pool.query("select * from todos ORDER BY id ASC")
    return res.rows
}

export async function getTodoById(id) {
    const res = await pool.query("select * from todos where id=$1 limit 1",[id]);
    return res.rows[0]
}

export async function createTodo(title,body) {
    const res=await pool.query("insert into todos (title,body) values($1,$2) RETURNING *",[title,body]);
    return res.rows[0];
}

export async function updateTodo(id,title , body) {
    const res = await pool.query("update todos set title=$1,body=$2 where id=$4 RETURNING *",[title , body ,id]);
    return res.rows[0];
}

export async function toggleDone(id) {
    const res=await pool.query("update todos set done=not done where id=$1 RETURNING *",[id]);
    return res.rows[0];
}

export async function deleteTodo(id) {
    const res=await pool.query("delete from todos where id=$1 returning *",[id]);
    return res.rows[0];
}
