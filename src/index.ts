import Server from './server/server';
import router from './router/router';
import MySQLConnection from './db/mysql_connection';

const server = Server.init(3000)
server.app.use(router)

// MySQLConnection.instance

server.start(() => {
    console.log('Server running on port 3000')
})