//If the secondary member contains the latest control document, it is safe to
//lock the member. Otherwise, wait until the member contains the document or
//select a different secondary member that contains the latest control
//document.
db.fsyncLock()
