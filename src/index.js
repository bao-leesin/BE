const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

const routes = require('./router')
const port = 3003

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Cross-Origin", "*");
    next()
  });

app.use(express.json()) 
app.use(express.urlencoded({extended:  true}))


app.use(cors())
app.use(morgan('combined'))


// Set up view
// app.engine('handlebars', handlebars.engine())
// app.set('view engine', 'handlebars')
// app.set('views', path.join(__dirname,'resources/views'))

routes(app)


app.listen(port, () => { 
    console.log('Server is running on http://localhost:' + port);
});

