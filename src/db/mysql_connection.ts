import mysql from 'mysql'

export default class MySQLConnection {

    private static _instance: MySQLConnection

    cnn: mysql.Connection
    connected: boolean = false

    constructor() {
        console.log('Initialize class')
        this.cnn = mysql.createConnection({
            host: 'localhost',
            port: 8889,
            user: 'node_user',
            password: '123456',
            database: 'tsnode_db'
        })

        this.connectDB()
    }

    // singleton
    public static get instance() {
        return this._instance || (this._instance = new this())
    }

    static executeQuery(query: string, callback: Function) {

        this.instance.cnn.query(query, (err, results: Object[], fields) => {
            if(err) {
                console.log('Query error', err)
                return callback(err)
            }

            if(results.length === 0) {
                callback('The requested record does not exist')
            } else {
                callback(null, results)
            }

        })

    }

    private connectDB() {
        this.cnn.connect((err: mysql.MysqlError) => {

            if(err) {
                console.log(err.message)
                return
            }

            this.connected = true
            console.log('Database online')

        })
    }

}