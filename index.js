const express = require('express');
const fileUpload = require('express-fileupload')
const ejs = require('ejs');
const { default: mongoose } = require('mongoose');
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })

const homeController = require('./cotrollers/home')
const aboutController = require('./cotrollers/about')
const contactController = require('./cotrollers/contact')
const newPostController = require('./cotrollers/newPost')
const getPostController = require('./cotrollers/getPost')
const storePostController = require('./cotrollers/storePost')
const validateMiddleWare = require('./middleware/validationMiddleware')



const app = new express();
app.set('view engine', 'ejs')
app.use(fileUpload())
app.use(express.static('public/'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/posts/store', validateMiddleWare)

app.get('/', homeController)
app.get('/about', aboutController)
app.get('/contact', contactController)
app.get('/posts/new', newPostController)


app.get('/post/:id', getPostController)
app.post('/posts/store', storePostController)




app.listen(4000, () => {
    console.log('App listenong to 4000 port');
})