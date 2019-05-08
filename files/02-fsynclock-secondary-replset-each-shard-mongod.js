//For each shard replica set in the sharded cluster, connect a mongo shell to
//the secondary member’s mongod instance and run db.fsyncLock().
db.fsyncLock()
