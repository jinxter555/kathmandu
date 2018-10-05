var OPStatus = Object.freeze({
  'activated': 1,
  'started': 1,
  'finished': 2,   // task requirement met
  'completed': 2,   // task requirement met
  'done': 2,
  'terminated': 3,  // task termination  requirement not met
  'suspended': 4,
  'cancelled': 5,
  'not_started': 6,
  'waiting': 7,
  'rejected': 8,     // rejected task by project manager/supervisor
});

module.exports = OPStatus
