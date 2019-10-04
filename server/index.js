require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const authCtrl = require('./controllers/authController')
const postCtrl = require('./controllers/postController')
const smsCtrl = require('./controllers/smsController')
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env

const app = express()

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET
}))

// Authenticate
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)

// Add, show, and delete listings
app.post('/api/newPost', postCtrl.createPost)
app.get('/api/posts', postCtrl.getPosts)
app.get('/api/post', postCtrl.singlePost)

// Twilio
app.post('/api/sendSMS', smsCtrl.sendSMS)

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} on station!`))
}).catch((err) => {
    console.log(err)
})