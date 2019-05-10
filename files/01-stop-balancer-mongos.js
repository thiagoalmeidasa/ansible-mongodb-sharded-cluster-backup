//If you do not stop the balancer, the backup could have duplicate data or omit
//data as chunks migrate while recording backups.
sh.stopBalancer()
