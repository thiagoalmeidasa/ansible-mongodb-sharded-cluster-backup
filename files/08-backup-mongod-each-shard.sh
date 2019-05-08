#!/bin/bash

mongodump --oplog --gzip --uri mongodb://{{ mongodb_backup_user }}:{{ mongodb_backup_pass }}@{{ mongod_locked_secondary_replset }}:{{ mongod_port }} -o {{ mongod_backup_dir }}
