const db = require('../models/index');
const fs = require('fs');
const { Op } = require('@sequelize/core');

exports.sendMessage =
(req, res, next) => {
const newMessage = new db.Message({
senderId: req.auth.userId,
receiverId: req.params.id,
content: req.body.content
});
if (req.file) {
newMessage.filePath = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
};
newMessage.save()
.then(() => res.status(201).json({ message: 'message envoyé' }))
.catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
};

exports.viewMessages =
(req, res, next) => {
db.Message.findAll({
where: {
[Op.or]: [
{ senderId: req.auth.userId, receiverId: req.params.id },
{ senderId: req.params.id, receiverId: req.auth.userId }
]
}
})
.then(messagess => res.status(200).json(messagess))
.catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
};

exports.deleteMessage =
(req, res, next) => {
db.Message.findOne({ where: { id: req.params.id } })
.then(message => {
if (message.senderId !== req.auth.userId || req.auth.isAdmin === false) {
return res.status(403).json({ message: 'vous ne pouvez pas supprimmer ce message' });
};
message.destroy()
.then(() => res.status(201).json({ message: 'message supprimé' }))
.catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
});
};