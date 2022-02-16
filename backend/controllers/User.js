exports.signup =
(req, res, next) => {
     res.status(200).json({message: 'test signup'});
};

exports.login =
(req, res, next) => {
     res.status(200).json({message: 'test login'});
};

exports.getUserGroup =
(req, res, next) => {
     res.status(200).json({message: 'test get group'});
};

exports.getUser =
(req, res, next) => {
     res.status(200).json({message: 'test get user'});
};

exports.getMe =
(req, res, next) => {
     res.status(200).json({message: 'test get me'});
};