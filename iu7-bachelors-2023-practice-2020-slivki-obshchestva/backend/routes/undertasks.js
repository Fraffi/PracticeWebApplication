const router = require('express').Router();
const Undertask = require('../models/undertasks.model');

router.route('/').get((req, res) => {
  Undertask.find()
    .then((undertasks) => res.json(undertasks))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/create').post((req, res) => {
  const { rootId } = req.body;
  // rootId - Object ID of up-task
  const { title } = req.body;
  const { taskid } = req.body;
  const { groupId } = req.body;

  const newUndertask = new Undertask({
    rootId,
    children: [],
    title,
    taskid,
    done: false,
    groupId
  });

  newUndertask
    .save()
    .then(() => {
      const undertaskid = newUndertask.id;

      Undertask.findById(rootId)
        .then((undertask) => {
          undertask.children.push(undertaskid);
          undertask
            .save()
            .then(() => res.json('Undertask added!'))
            .catch((err) => res.status(400).json('Error: ' + err));
        })
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/update').post((req, res) => {
  const { undertaskid } = req.body;
  const { title } = req.body;
  const { done } = req.body;

  Undertask.findById(undertaskid)
    .then((undertask) => {
      undertask.title = title;
      undertask.done = done;

      undertask.children.map((child) =>
        Undertask.findById(child).then((under) => {
          under.done = done;
          under.save();
        })
      );

      undertask
        .save()
        .then(() => res.json('Undertask updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  const undertaskid = req.params.id;

  Undertask.findByIdAndDelete(undertaskid)
    .then(() => res.status(200).json('Undertask deleted!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
