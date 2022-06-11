const express = require('express');
const router = require('./config/route');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();
app.use(express.urlencoded({extended: false}))


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());



app.use(cookieParser());
require('./config/mongoose');

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/community', requireAuth);
app.get('/addquestions', requireAuth);
app.get('/communitydetails', requireAuth);
app.use(router);


app.listen('3000', () => {
    console.log('server is running on port 3000')
})