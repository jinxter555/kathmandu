var OPStatus = Object.freeze({
  not_started: 'not_started',   // created  by the project manager or user .. use a template for replicating tasks
  activated: 'started',
  started: 'started',
  finished: 'done',   // task requirement met
  completed: 'done',   // task requirement met
  done: 'done',
  terminated: 'terminated',  // task termination  requirement not met
  suspended: 'suspended',
  cancelled: 'cancelled',
  waiting: 'waiting',
  rejected: 'rejected',     // rejected task by project manager/supervisor
});

module.exports = OPStatus
