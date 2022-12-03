const express = require('express');
const fileUpload = require('express-fileupload')
const ejs = require('ejs');
const { default: mongoose } = require('mongoose');
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })

const expressSession = require('express-session');
const homeController = require('./cotrollers/home')
const aboutController = require('./cotrollers/about')
const contactController = require('./cotrollers/contact')
const newPostController = require('./cotrollers/newPost')
const getPostController = require('./cotrollers/getPost')
const storePostController = require('./cotrollers/storePost')
const validateMiddleWare = require('./middleware/validationMiddleware')
const newUserController = require('./cotrollers/newUser')
const storeUserController = require('./cotrollers/storeUser')
const loginController = require('./cotrollers/login')
const loginUserController = require('./cotrollers/loginUser')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')

const app = new express();
app.set('view engine', 'ejs')
app.use(fileUpload())
app.use(express.static('public/'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const authMiddleware = require('./middleware/authMiddleware')

app.use('/posts/store', validateMiddleWare)
app.use(expressSession({ secret: 'keyboard cat' }))
app.get('/', homeController)
app.get('/about', aboutController)
app.get('/contact', contactController)
app.get('/posts/new',authMiddleware, newPostController)


app.get('/post/:id', getPostController)
app.get('/auth/login',redirectIfAuthenticatedMiddleware, loginController);
app.get('/auth/register',redirectIfAuthenticatedMiddleware, newUserController)

app.post('/posts/store', authMiddleware, storePostController)
app.post('/users/register', redirectIfAuthenticatedMiddleware,storeUserController)
app.post('/users/login', redirectIfAuthenticatedMiddleware,loginUserController)


app.listen(4000, () => {
    console.log('App listenong to 4000 port');
})