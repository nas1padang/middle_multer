const express = require('express');
const app =  express()
const bodyParser = require('body-parser')
const morgan = require('morgan');
const path = require('path');

require('dotenv').config()

const pool = require('./helper/connect')

pool.connect((err,res) => {
    if(err){
        console.log('Failed to connecting!', err)
    }
    else{
        console.log('Connected to Database')
    }
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('tiny'));

// panggil route
const userRoutes = require('./routes/user')
const movies = require('./routes/movies')
const movie = require('./routes/view')

app.use('/', movie)
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use('/login', userRoutes);
app.use('/movies', movies);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));