const app = require('./app')
require('dotenv').config()

const knex = require('knex')

require('dotenv').config()

const { PORT, DATABASE_URL } = require('./config')

app.use((error,req,res,next) => {
    let response

    if(process.env.NODE_ENV === 'production'){
        response = { error: {message: 'server error'}}
    } else {
        respone = { error }
    }
    res.status(500).json(response)
})

const db = knex({
    client: 'pg',
    connection: {
        host: 'ec2-3-232-163-23.compute-1.amazonaws.com',
        user: 'tpicoklvgbcetc',
        password: '85fa17e2852d2998d6fbb50a27110f2986a0f027acc92e93ef354bcb3b273878',
        database: 'd2e5j53020b0rd'
    }
})

// const db = knex({
//     client:  'pg',
//     connection: {
//         host: 'localhost',
//         user: 'postgres',
//         password: '',
//         database: 'drink-social'
//     }
// })

app.set('db',db)

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})