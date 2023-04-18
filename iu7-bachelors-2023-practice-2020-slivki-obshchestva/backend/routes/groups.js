const router = require('express').Router();
const Group = require('../models/groups.model');
const Task = require('../models/tasks.model');
const Undertask = require('../models/undertasks.model');

router.route('/').get((req, res) => {
  Group.find()
    .then((groups) => res.json(groups))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/create').post((req, res) => {
  const { name } = req.body;
  const { honorid } = req.body;
  // honorid - Object ID of user in usersDB

  Group.countDocuments({ name, honorid }, function f(err, count) {
    if (count === 0) {
      const newGroup = new Group({
        name,
        honorid
      });

      newGroup
        .save()
        .then(() => res.json('Group added!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    } else {
      res.json('Group already created!');
    }
  });
});

router.route('/update').post((req, res) => {
  const { groupId } = req.body;
  const { name } = req.body;

  Group.findById(groupId)
    .then((group) => {
      group.name = name;

      group
        .save()
        .then(() => res.json('Groupname updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  const groupId = req.params.id;

  Group.findByIdAndDelete(groupId)
    .then(() => {
      Task.remove({ groupId })
        .then(() => {
          Undertask.remove({ groupId })
            .then(() => res.status(200).json('Group deleted!'))
            .catch((err) => res.status(400).json('Error: ' + err));
        })
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
