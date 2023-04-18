const router = require('express').Router();
const User = require('../models/users.model');
const Group = require('../models/groups.model');
const Task = require('../models/tasks.model');

router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  const userid = req.params.id;
  User.findById(userid, { name: 1, token: 1 })
    .then((users) => {
      Group.find({ honorid: userid }, { name: 1 }).then((groups) => {
        Task.find(
          { honorid: userid },
          { groupId: 1, title: 1, shared: 1 }
        ).then((tasks) => res.status(200).json({ users, groups, tasks }));
      });
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/create').post((req, res) => {
  const { name } = req.body;
  const { token } = req.body;
  User.countDocuments({ token }, function f(err, count) {
    if (count === 0) {
      const newUser = new User({
        name,
        token
      });

      newUser
        .save()
        .then(() => res.json('User added!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    } else {
      res.json('User already signed!\n' + User.find({ token }));
    }
  });
});

router.route('/update').post((req, res) => {
  const { name } = req.body;
  const { token } = req.body;

  User.findOne({ token })
    .then((user) => {
      user.name = name;

      user
        .save()
        .then(() => res.json('name updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
