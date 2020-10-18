import { Router, Request, Response } from 'express'
import MySQLConnection from '../db/mysql_connection';

const router = Router()

router.get('/heroes', (req: Request, res: Response) => {

    const query = ` SELECT * FROM heroes `

    MySQLConnection.executeQuery(query, (err: any, data: Object[]) => {
        if(err) {
            res.status(400).json({
                ok: false,
                error: err
            })
        } else {
            res.json({
                ok: true,
                heroes: data
            })
        }
    })

})

router.get('/heroes/:id', (req: Request, res: Response) => {

    const id = req.params.id

    // avoid a user inserted sql string
    const escapedId = MySQLConnection.instance.cnn.escape(id)

    const query = ` SELECT * FROM heroes
                    WHERE id = ${escapedId} `

    MySQLConnection.executeQuery(query, (err: any, data: Object[]) => {
        if(err) {
            res.status(400).json({
                ok: false,
                error: err
            })
        } else {
            res.json({
                ok: true,
                heroe: data[0]
            })
        }
    })

})

export default router;