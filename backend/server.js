const express = require('express');
require('dotenv').config();
const passport = require('passport');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');

const UserAdmin = require('./models/userAdminModel');

const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

const userAdminRouter = require('./routes/userAdminRoutes');
const productRouter = require('./routes/productRoutes.js');
const homepageRouter = require('./routes/homepageRoutes');

connectDB();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/v1/', homepageRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/admins', userAdminRouter);

// Session
passport.use(UserAdmin.createStrategy());
passport.serializeUser(UserAdmin.serializeUser());
passport.deserializeUser(UserAdmin.deserializeUser());

// Error handling
app.use(errorHandler);

// Server listening
app.listen(port, () => {
  console.log(`> Server is online on port ${port}`);
});
