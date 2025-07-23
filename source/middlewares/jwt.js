const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: '인증 토큰 없음' });
  }

  const token = auth.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // 이후 컨트롤러에서 req.user 사용 가능
    next();
  } catch (err) {
    return res.status(401).json({ message: '인증 토큰이 유효하지 않거나 만료되었습니다.' });
  }
};