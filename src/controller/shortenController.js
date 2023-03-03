import { db } from "../config/database.conection.js";
import { nanoid } from 'nanoid'

export async function shortenUrl(req, res) {
    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')

    const userIsLoged = await db.query(`SELECT * FROM tokens WHERE token = $1;`, [token])
    if (!token || !userIsLoged) return res.sendStatus(401)

    const { url } = req.body
    const shortLink = nanoid(8)

    try {
        await db.query(`INSERT INTO urls (user_id, url)
        VALUES ($1, $2);`, [userIsLoged.rows[0].user_id, url])

        const myUrl = await db.query(`SELECT * FROM urls WHERE user_id = $1 AND url = $2;`, [userIsLoged.rows[0].user_id, url])
        
        await db.query(`INSERT INTO shorty (user_id, url_id, shorted_url)
        VALUES ($1, $2, $3);`, [userIsLoged.rows[0].user_id, myUrl.id, shortLink ])
        
        const response = {id: myUrl.id, shortUrl: shortLink}
        res.status(201).send(response)
    } catch (error){
        res.send(error)
    }
}