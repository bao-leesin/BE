require('dotenv').config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

const routes = require('./router')
const Visitor = require('./models/Visitor')
const Admin = require('./models/Admin')
const port = process.env.PORT || 3003

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
 
let visitor = new Visitor("us1","pw1")
let admin = new Admin(1,"us2","pw2")

console.log(visitor);
console.log(admin);

app.listen(port, () => { 
    console.log('Server is running on http://localhost:' + port);
});

