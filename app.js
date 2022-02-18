const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const res = require('express/lib/response');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Reviews = require('./models/Reviews');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true}))
app.use(bodyParser.urlencoded({extended: true}))

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://admin:kanye50cent@cluster0.uqzbm.mongodb.net/instagram?';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', async (req, res) =>{ 
  const reviews = await Reviews.find({}).limit(3)
  res.render('home', {
    reviews : reviews
  })
});
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);
app.use(reviewRoutes);
