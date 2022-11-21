const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload')
const ejs = require('ejs');
const { default: mongoose } = require('mongoose');
const bodyParser = require('body-parser')
const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })

const app = new express();
app.set('view engine', 'ejs')
const options = {};
app.use(fileUpload())
app.use(express.static('public/'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const validateMiddleWare = (req, res, next) => {
    if (req.files == null || req.body.title == null || req.body.image == null) {
        return res.redirect('/posts/new')
    }
    next()
}
app.use('/posts/store',validateMiddleWare)
app.get('/', async (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'pages/index.html'))
    const blogposts = await BlogPost.find({});
    res.render('index', { blogposts })

})
app.get('/posts/new', (req, res) => {
    res.render('create')
})
app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id);
    console.log(blogpost);
    res.render('post', { blogpost })
})
app.get('/about', (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'pages/about.html'))
    res.render('about')

})
app.get('/contact', (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
    res.render('contact')

})
app.get('/post', (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'pages/post.html'))
    res.render('post')

})


app.post('/posts/store', async (req, res) => {
    const image = req.files.image;
    const imgPath = path.resolve(__dirname, 'public/img', image.name);
    // console.log(image);
    image.mv(imgPath, async (error) => {
        if (error) console.log(error);
        await BlogPost.create({ ...req.body, image: '/img/' + image.name })
        res.redirect('/')
    });

})
app.listen(4000, () => {
    console.log('App listenong to 4000 port');
})