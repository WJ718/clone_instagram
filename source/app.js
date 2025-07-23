const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
const passportConfig = require('./passport');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');

const {sequelize} = require('./models/index');

const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');

const app = express();
passportConfig();

app.set('port', process.env.PORT || 8000);
app.set('view engine', 'ejs');

sequelize.sync({force: true})
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

const sessionMiddleware = session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    }
});

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// set router
app.use("/", indexRouter, );
app.use("/auth", authRouter);

app.use((req,res,next) => {
    res.locals.user = req.user;
    next();
});

app.use((req, res, next) => {
    const error = new Error(`${req.method}, ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(err);
});

app.use((err,req,res,next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});





