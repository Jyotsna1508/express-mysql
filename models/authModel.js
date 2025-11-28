import {db} from '../config/db-client.js';

export async function getUserByEmail(email){
    const [rows] = await db.execute("select * from users where email=?", [email]);
    return rows[0];
}
export async function getUserById(id){
    const [rows] = await db.execute("select * from users where id=?", [id])
    return rows[0];
}
export async function createNewUser({name, email, password}){
    const [rows] = await db.execute("INSERT into users (name, email, password) values (?,?,?)", [name, email, password]);
    return rows.insertId;
}

export async function createSession(usersId, {ip, userAgent}){
    const [session] = await db.execute("INSERT into sessions (user_id, user_agent, ip) values (?,?,?)", [usersId, ip, userAgent]);
    return session.insertId;
}

export async function clearUserSession(sessionId){
    const [session] = await db.execute("DELETE from sessions where id=?", [sessionId]);
    return session.affectedRows;
}

export async function getSessionById(sessionId){
    const [session] = await db.execute("Select * from sessions where id=?", [sessionId]);
    return session[0];
}


