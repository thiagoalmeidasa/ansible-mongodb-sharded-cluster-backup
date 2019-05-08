//If locking a secondary of the CSRS, confirm that the member has replicated
//data up to some control point.
use config
db.BackupControl.findAndModify({
  query: {
    _id: 'BackupControlDocument'
  },
  update: {
    $inc: {
      counter: 1
    }
  },
  new: true,
  upsert: true,
  writeConcern: {
    w: 'majority',
    wtimeout: 15000
  }
});
