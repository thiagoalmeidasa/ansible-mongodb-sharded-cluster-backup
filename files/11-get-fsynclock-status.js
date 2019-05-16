serverIsLocked = function() { var co = db.currentOp(); if (co && co.fsyncLock) { return true; } return false; }; print('isLocked:', serverIsLocked());
