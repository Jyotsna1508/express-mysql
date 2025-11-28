import { db } from "../config/db-client.js";

export async function loadLinks() {
  const [rows] = await db.execute("select * from url_shortner");
  return rows;
}

export async function addLink(url, short_code) {
  const [results] = await db.execute(
    "INSERT INTO url_shortner (url, short_code) values (?, ?)",
    [url, short_code]
  );
  return results.insertId;
}
export async function updateLinks(id, newUrl) {
  const [results] = await db.execute(
    "Update url_shortner set url=? where id=?",
    [newUrl, id]
  );
  return results.affectedRows;
}
export async function deleteLinks(id) {
  const [results] = await db.execute(`Delete from url_shortner where id = ?`, [
    id,
  ]);
  return results.affectedRows;
}
