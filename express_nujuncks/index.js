const express = require('express')
const nunjucks = require('nunjucks')

app = express()

const middlewareAgeVerification = (req, res, next) => {
    if (req.query.age == "") {
        res.redirect('/')
    } else {
        next()
    }
}

nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

app.get('/', (req, res) => {
    return res.render('registerage')
})

app.post('/check', (req, res) => {
    if (req.body.age >= 18) {
        res.redirect(`major/?age=${req.body.age}`)
    } else {
        res.redirect(`minor/?age=${req.body.age}`)
    }     
})

app.get('/major', middlewareAgeVerification, (req, res) => {
    var age = req.query.age
    return res.render('ageresult', { age })
})

app.get('/minor', middlewareAgeVerification, (req, res) => {
    var age = req.query.age
    return res.render('ageresult', { age }) 
})

app.listen(3000)