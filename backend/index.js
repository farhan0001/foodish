const express = require('express')
const mongoDB = require('./db')

const app = express()
const port = process.env.PORT || 4000

mongoDB()

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
})

app.use(express.json())
app.use('/api', require('./Routes/SignUpLogin'))
app.use('/api', require('./Routes/DisplayData'))
app.use('/api', require("./Routes/OrderData"))

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})