#!/bin/bash

mongodump --oplog --gzip --uri mongodb://{{ mongodb_backup_user }}:{{ mongodb_backup_pass }}@{{ mongoc_locked_secondary_replset }}:{{ mongoc_port }} -o {{ mongoc_backup_dir }}
