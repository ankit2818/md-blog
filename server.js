const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Article = require('./models/article')
const articleRouter = require('./routes/articles.js')
const app = express()

/** db configuration */
mongoose.set('strictQuery', true)
mongoose.connect('mongodb://localhost/blog')

/** set view engine */
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render("articles/index", {articles: articles})
})
/** article router configuration */
app.use('/article', articleRouter)

app.listen(3000)