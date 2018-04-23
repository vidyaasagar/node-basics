const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const port = 3000

const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser());

const md = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'


// initializes the handlebars engine and sets the layouts directory to views/layouts
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    response.render('home', {
        name: 'John'
    })
})

app.post('/users', function(req,res,next){
    const user = req.body
    md.connect(
        url,
        function (err, client) {
            const db = client.db('accounts')
            let collection = db.collection('users')
            //insertion operation
            collection.insert(user, function (err, count) {
                //selecting all documents
                collection.find().toArray(function (err, documents) {
                    //console.dir(documents);
                    client.close()

                    if (err) {
                        // pass the error to the express error handler
                        return next(err)
                    }

                    res.send(200)
                });

            });

        });
})

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
})