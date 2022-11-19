const express = require('express');
const path = require('path');
const ejs = require('ejs');
const { default: mongoose } = require('mongoose');
const bodyParser = require('body-parser')
const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })

const app = new express();
app.set('view engine', 'ejs')
const options = {};
app.use(express.static('public/'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'pages/index.html'))
    const blogposts = await BlogPost.find({});
    console.log(blogposts);
    res.render('index', { blogposts })

})
app.get('/posts/new', (req, res) => {
    res.render('create')
})
app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id);
    res.render('/post', { blogpost })
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
    console.log(req.body);
    await BlogPost.create(req.body);
    res.redirect('/')
})
app.listen(4000, () => {
    console.log('App listenong to 4000 port');
})