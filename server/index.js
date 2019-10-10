
require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const authCtrl = require('./controllers/authController')
const postCtrl = require('./controllers/postController')
const comCtrl = require('./controllers/smsController')
const s3Ctrl = require('./controllers/s3Controller')
const sysCtrl = require('./controllers/sysController')

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env

const app = express()

app.use(express.static(`${__dirname}/../build`))
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
app.delete('/api/post', postCtrl.deletePost)
app.put('/api/post', postCtrl.updatePost)
app.get('/api/account/posts', postCtrl.getMyPosts)

// ngrok http port#
// Twilio
app.post('/api/sendSMS', comCtrl.sendSMS)
app.post('/sms', comCtrl.recieveSMS)
app.post('/api/call', comCtrl.initiateCall)
app.post('/api/verify', comCtrl.verifyNumber)
app.post('/api/confirm', comCtrl.confirmNumber)

// S3
app.get('/api/signs3', s3Ctrl.getS3)

// System (for grabbing system information. The idea is here is rather than the user
// having to spend 30 minutes trying to enter their computer in for sale, they can click a button
// and have them pull it from the machine directly. This does of course, require that you use the app on
// the computer you want to sell.)
app.get('/api/system/specs', sysCtrl.getSystemInfo)


massive(CONNECTION_STRING).then(db => {
    console.log('in db')
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} on station!`))

}).catch((err) => {
    console.log(err)
})
