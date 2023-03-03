import { db } from "../config/database.conection.js";
import { v4 as uuid } from "uuid"

export async function postSignup(req, res) {
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

    } catch (error) {
        res.send(error)
    }
}

export async function postSignin (req, res) {
    const {email, password}  = req.body
    const user = await db.query(`SELECT * FROM users WHERE email = $1;`, [email])

    if (user.rowCount === 0 || user.rows[0].senha !== password) {
        return res.sendStatus(401)
    }

    try {
        const token = uuid()
        await db.query(`INSERT INTO tokens (user_id, token)
        VALUES ($1, $2);`, [user.rows[0].id, token])
        res.sendStatus(200)
    } catch (error) {
        res.send(error)
    }
}