const router = require('express').Router();
const Task = require('../models/tasks.model');
const Undertask = require('../models/undertasks.model');

function Child(arr, cur, uunder) {
  // eslint-disable-next-line array-callback-return
  arr.map((child) => {
    // eslint-disable-next-line array-callback-return
    uunder.map((under) => {
      if (under.id === child) {
        const curr = {
          id: under.id,
          title: under.title,
          done: under.done,
          children: []
        };
        cur.children.push(curr);
        Child(under.children, curr, uunder);
      }
    });
  });
}

router.route('/').get((_req, res) => {
  Task.find()
    .then((tasks) => res.json(tasks))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/create').post((req, res) => {
  const { groupId } = req.body;
  const { title } = req.body;
  const { honorid } = req.body;
  const { shared } = req.body;

  const newTask = new Task({
    groupId,
    title,
    honorid,
    shared
  });

  newTask
    .save()
    .then(() => {
      const taskid = newTask.id;
      const rootId = taskid;

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
        .then(() => res.json('Task added!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  const taskid = req.params.id;
  const response = [];
  Undertask.findOne(
    { rootId: taskid },
    { title: 1, rootId: 1, done: 1, children: 1 }
  ).then((undertask) => {
    const cur = {
      id: undertask.id,
      title: undertask.title,
      done: undertask.done,
      children: []
    };
    Undertask.find({ taskid }).then((under) => {
      Child(undertask.children, cur, under);
      response.push(cur);
      /* // eslint-disable-next-line no-console
      console.log(under); */
      res.json(response);
    });
  });
});

router.route('/update').post((req, res) => {
  const { taskid } = req.body;
  const { title } = req.body;

  Task.findById(taskid)
    .then((task) => {
      task.title = title;
      task
        .save()
        .then(() => res.json('Task updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  const taskid = req.params.id;

  Task.findByIdAndDelete(taskid)
    .then(() => {
      Undertask.remove({ rootId: taskid })
        .then(() => res.status(200).json('Task and undertasks deleted!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
