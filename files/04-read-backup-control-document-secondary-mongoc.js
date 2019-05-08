//Query the CSRS secondary member for the returned control document.
rs.slaveOk();
use config;

db.BackupControl.find({
  "_id": "BackupControlDocument",
  "counter": 1
}).readConcern('majority');
