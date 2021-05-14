const express = require('express')
const app = express()

const cors = require("cors")
const cookieParser = require("cookie-parser")
const Sequelize = require('sequelize')


const port = 3000

const routes = require('./app/controllers/authController')
const db = require('./config/db')
    // const user = require('./app/models/auth')

// db.sequelize.sync({ force: true }).then(() => {
//     console.log('Drop and Resync with { force: true }');
// });

app.use(express.json());

app.use(cookieParser())

app.use(cors({
    credentials: true,
    origin: ['*']
}))
app.use('/api', routes)
app.get('/', (req, res) => {
    res.send('Hello World!')
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})