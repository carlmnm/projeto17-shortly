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

export async function getUrlById(req, res) {
    const { id } = req.params

    try {
        const shortedUrl = await db.query(`SELECT * FROM shortys WHERE id = $1;`, [id])

        if (shortedUrl.rowCount === 0) return res.sendStatus(404)

        const originalUrl = await db.query(`SELECT * FROM urls WHERE id = $1;`, [shortedUrl.rows[0].url_id])

        res.status(200).send({id: id, shortUrl: shortedUrl.rows[0].shorted_url, url: originalUrl.rows[0].url})

    } catch (error) {
        res.send(error)
    }
}

export async function openShort (req, res) {
    const short = req.params.shortUrl
    try{
        const shortExists = await db.query(`SELECT * FROM shortys WHERE shorted_url = $1;`, [short])
        if (shortExists.rowCount === 0) return res.sendStatus(404)

        const originalUrl = await db.query(`SELECT * FROM urls WHERE id = $1;`, [shortExists.rows[0].url_id])

        let myViews = Number(shortExists.rows[0].views) + 1
        await db.query(`UPDATE shortys SET views = $1 WHERE id = $2;`, [myViews, shortExists.rows[0].id])

        console.log(originalUrl.rows[0].url)
        res.redirect(302, originalUrl.rows[0].url)
    } catch (error){
        console.log(error)
    }
}

export async function deleteUrl (req, res) {
    const { id } = req.params
    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')

    const userIsLoged = await db.query(`SELECT * FROM tokens WHERE token = $1;`, [token])
    const myUrl = await db.query(`SELECT * FROM shortys WHERE id = $1;`, [id])
    if (myUrl.rowCount === 0) return res.sendStatus(404)
    if (!token || userIsLoged.rowCount === 0 || userIsLoged.rows[0].userId !== myUrl.rows[0].user_id) return res.sendStatus(401)

    try{
        await db.query(`DELETE FROM shortys WHERE id = $1;`, [id])
        await db.query(`DELETE FROM urls WHERE ID = $1;`, [myUrl.rows[0].url_id])
        res.sendStatus(204)
    } catch (error) {
        res.send(error)
    }
}