const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.login = async (email, password) => {
    user = await User.findOne({where: {email}});

    if (!user) {
        const error = new Error('존재하지 않는 사용자입니다.');
        error.status = 401;
        throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        const error = new Error('비밀번호가 일치하지 않습니다.');
        error.status = 402;
        throw error;
    }

    return user;    
}

exports.signup = async (email, password, nickname) => {
    user = await User.findOne({where: {email}});

    if (user) {
        const error = new Error('이미 존재하는 사용자입니다.');
        error.status = 403;
        throw error;
    }

    const salt = await bcrypt.genSalt(12);
    const hashed = await bcrypt.hash(password, salt)

    const newUser = await User.create({
        email,
        password: hashed,
        nickname,
    });

    return newUser;    
}