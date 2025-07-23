const authService = require('../services/authService');
const jwt = require('jsonwebtoken');

exports.login = async(req, res, next) => {
    const {email, password} = req.body;

    try {
        const user = await authService.login(email, password);

        const token = jwt.sign(
            {id: user.id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: '1h'},
        );

        res.status(200).json({
            message: '로그인 성공',
            token,
            user: {
                id: user.id,
                email: user.email,
                user: {
                    id: user.id,
                    nickname: user.nickname
                }
            },
        });

    } catch(err) {
        console.error(err);
        next(err);
    }
}

exports.signup = async(req,res,next) => {
    const {email, password, nickname} = req.body;

    try {
        user = await authService.signup(email, password, nickname); // 새로운 사용자 반환

        // 자동 로그인 로직 만들기
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: '회원가입 및 자동 로그인 성공',
            token,
            user: {
                id: user.id,
                email: user.email,
                nickname: user.nickname,
            },
        });

    } catch(err) {
        console.error(err);
        next(err);
    }
}

exports.logout = async (req, res) => {
  res.status(200).json({ message: '로그아웃 완료' });
};