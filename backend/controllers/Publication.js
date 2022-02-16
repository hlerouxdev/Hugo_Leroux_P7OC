exports.createPost =
(req, res, next) => {
     res.status(200).json({message: 'test create post'});
};

exports.modifyPost =
(req, res, next) => {
     res.status(200).json({message: 'test modify post'});
};

exports.deletePost =
(req, res, next) => {
     res.status(200).json({message: 'test delete post'});
};

exports.getAllPost =
(req, res, next) => {
     res.status(200).json({message: 'test get all post'});
};

exports.getOnePost =
(req, res, next) => {
     res.status(200).json({message: 'test get one post'});
};

exports.likePost =
(req, res, next) => {
     res.status(200).json({message: 'test like post'});
};