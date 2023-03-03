import { db } from "../config/database.conection.js";

export async function postUser(req, res) {
    const {name, email, password, confirmPassword} = req.body
    const userExists = await db.query(`SELECT * FROM users WHERE email = $1;`, [email])
    if (userExists.rows[0]) {
        return res.status(409).send("você já existe")
    }
    if (password !== confirmPassword) {
        return res.sendStatus(422)
    }
    try{
        await db.query(`INSERT INTO users (nome, email, senha)
        VALUES ($1, $2, $3);`, [name, email, password])
        res.sendStatus(201)

    } catch {

    }
}