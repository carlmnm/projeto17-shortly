import { db } from "../config/database.conection.js";
import { nanoid } from 'nanoid'

export async function shortenUrl(req, res) {
    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')

    //console.log(token)

    const userIsLoged = await db.query(`SELECT * FROM tokens WHERE token = $1;`, [token])
    //const userIsLoged = await db.query(`SELECT * FROM tokens `)
    if (!token || userIsLoged.rowCount === 0) return res.sendStatus(401)

    const { url } = req.body
    const shortLink = nanoid(8)

    //const userId = userIsLoged.rows[0]
    //console.log(userIsLoged.rows[0])

    try {
        await db.query(`INSERT INTO urls (user_id, url)
        VALUES ($1, $2);`, [userIsLoged.rows[0].userId, url])

        const myUrl = await db.query(`SELECT * FROM urls WHERE user_id = $1 AND url = $2;`, [userIsLoged.rows[0].userId, url])

        await db.query(`INSERT INTO shortys (user_id, url_id, shorted_url)
        VALUES ($1, $2, $3);`, [userIsLoged.rows[0].userId, myUrl.rows[0].id, shortLink])
        
        console.log("oi")
        //const response = { id: myUrl.id, shortUrl: shortLink }
        return res.status(201).send({ id: myUrl.rows[0].id, shortUrl: shortLink })
    } catch (error) {
        res.send(error)
    }
}