const express = require('express')
const app = express()
var cors = require('cors')

app.use(cors())
require('./middlewares/dbConnection')
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.get('/', (req, res)=>{
    console.log('Reached to backend.')
    res.status(200).json({message: 'Welcome to the backend!'})
})
app.use('/authenticate', require('./routes/authRoutes'))
app.use('/contact', require('./routes/contact'))


app.listen(process.env.PORT||5000, ()=>{
    console.log(`App listening at port ${process.env.PORT||5000}`);
})