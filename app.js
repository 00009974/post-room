// modules
const express = require('express');
const ejs = require('ejs');
const app = express();

// file system
const fs = require('fs');

// ejs
app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');


// styles folder
app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: false}));

app.get('/', (req, res) => {
    fs.readFile('./data/notes.json', (err, data) => {
        if (err) throw err

        const articles = JSON.parse(data)

        res.render('index', {articles: articles});
    })
})



app.get('/articles', (req, res) => {

    fs.readFile('./data/notes.json', (err, data) => {
        if (err) throw err

        const articles = JSON.parse(data)

        res.render('articles', {articles: articles});
    })
})

app.get('/create', (req, res) => {
    res.render('create', { error: null })
  });

app.post('/create', (req, res) => {
    const title = req.body.title
    const blog = req.body.blog
    const author = req.body.author

    if (title.trim() === '' && blog.trim() === '' && author.trim() === '') {
        res.render('create', { error: true });
    } else {
        fs.readFile('./data/notes.json', (err, data) => {
            if (err) throw err

            const notes = JSON.parse(data)

            notes.push({
                id: id (),
                title: title,
                blog: blog,
                author: author, 
            })

            fs.writeFile('./data/notes.json', JSON.stringify(notes), err => {
                if (err) throw err

                res.render('index')
            })
        })
    }

    res.render("index");
})

app.get('/:id', (req, res) => {
    const id = req.params.id

    fs.readFile('./data/notes.json', (err, data) => {
        if (err) throw err

        const articles = JSON.parse(data)

        const article = articles.filter(article => article.id === id)[0]
        
        res.render("detail", { article: article });
    })

})

// server
app.listen(8000, err => {
    if(err) console.log(err)

    console.log('Server is running on port 8000...')
});

function id () {
    return '_' + Math.random().toString(36).substr(2, 9);
  };