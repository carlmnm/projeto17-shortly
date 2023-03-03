import { db } from "../config/database.conection.js";
import { v4 as uuidV4 } from "uuid"

export async function postSignup(req, res) {
    const { name, email, password, confirmPassword } = req.body
    const userExists = await db.query(`SELECT * FROM users WHERE email = $1;`, [email])
    if (userExists.rows[0]) {
        return res.status(409).send("você já existe")
    }
    if (password !== confirmPassword) {
        return res.sendStatus(422)
    }
    try {
        await db.query(`INSERT INTO users (nome, email, senha)
        VALUES ($1, $2, $3);`, [name, email, password])
        res.sendStatus(201)

    } catch (error) {
        res.send(error)
    }
}

export async function postSignin(req, res) {
    const { email, password } = req.body
    const user = await db.query(`SELECT * FROM users WHERE email = $1;`, [email])

    if (user.rowCount === 0 || user.rows[0].senha !== password) {
        return res.sendStatus(401)
    }

    try {
        const token = uuidV4()
        await db.query(`INSERT INTO tokens ("userId", token)
        VALUES ($1, $2);`, [user.rows[0].id, token])

        return res.status(200).send({ token })
    } catch (error) {
        res.send(error)
    }
}

export async function showUserData(req, res) {
    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')

    try {
        const userIsLoged = await db.query(`SELECT * FROM tokens WHERE token = $1;`, [token])
        const user = await db.query(`SELECT * FROM users WHERE id = $1;`, [userIsLoged.rows[0].userId])

        if (!token || userIsLoged.rowCount === 0) return res.sendStatus(401)

        const totalViews = await db.query(`SELECT SUM (views) AS total FROM shortys WHERE user_id = $1;`, [userIsLoged.rows[0].userId])

        const myShortLinks = await db.query(`SELECT shortys.id, shortys.shorted_url, shortys.views FROM shortys WHERE user_id = $1;`, [userIsLoged.rows[0].userId])

        const myUrls = await db.query(`SELECT urls.url FROM urls WHERE user_id = $1;`, [userIsLoged.rows[0].userId])

        const shortedData = myShortLinks.rows.map((item) => {
            return {
                id: item.id,
                shortUrl: item.shorted_url,
                visitCount: item.views
            }
        })

        const userData = {
            id: userIsLoged.rows[0].userId,
            name: user.rows[0].nome,
            visitCount: totalViews.rows[0].total,
            shortenedUrls: shortedData
        }

        res.status(200).send(userData)
    } catch {

    }

}

export async function showRank(req, res) {
    try {
        const rankMaker = await db.query(`
        SELECT users.id, users.nome,
        COUNT(shortys.shorted_url) AS "linksCount", 
        SUM(shortys.views) AS "visitCount"
        JOIN users ON urls.user_id = users.id
        FROM shortys
        JOIN urls ON urls.user_id = users.id
        GROUP BY users.id
        ORDER BY "visitCount" DESC
        LIMIT 10
        `);
        res.status(200).send(rankMaker)
    } catch (error) {
        res.status(500).send(error.message);
    }
}