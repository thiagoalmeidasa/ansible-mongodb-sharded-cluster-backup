//If your deployment uses CSRS config servers, unlock the config server node
//before proceeding to the next step. To unlock the CSRS member, use
//db.fsyncUnlock() method in the mongo shell.
db.fsyncUnlock()
