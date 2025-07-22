const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = () => {
    passport.use(new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async(email, password, done) => {
        try {
            const user = await User.findOne({where: {email}});
            
            if(!user) {
                return done(null, false, {message: '가입되지 않은 이메일입니다.'});
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) {
                return done(null, false, {message: '비밀번호가 일치하지 않습니다.'});
            }

            return done(null, user); // success --> req.login(user)
        } catch(err) {
            console.error(err);
            done(err);
        }
    }));
};