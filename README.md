# ansible-ansible-mongodb-sharded-cluster-backup

Ansible role to perform backups in a sharded cluster with database dumps

## Ansible requirements

### Ansible version

Minimum required ansible version is 2.6.

### Ansible role dependencies

None.

## Basic Usage

Basic usage is:

```yaml
- hosts: myclusterservers
  roles:
    - role: ansible-mongodb-sharded-cluster-backup
      vars:
        mongodb_backup_pass: backup_pass
        mongodb_backup_user: backup_user
        publish_to_s3: true
        aws_access_key: someaccesskey
        aws_secret_key: somesecretkey
        aws_region: someregion
        mongodb_backup_s3_bucket: mongodb-bucket
        mongodb_backup_s3_key_prefix: keyprefix
```

## Role Variables

Variables are divided in three types.

The [default vars](#default-vars) section shows you which variables you may
override in your ansible inventory. As a matter of fact, all variables should
be defined there for explicitness, ease of documentation as well as overall
role manageability.

The [mandatory variables](#mandatory-variables) section contains variables that
for several reasons do not fit into the default variables. As name implies,
they must absolutely be defined in the inventory or else the role will
fail. It is a good thing to avoid reach for these as much as possible and/or
design the role with clear behavior when they're undefined.

The [context variables](#context-variables) are shown in section below hint you
on how runtime context may affects role execution.

### Default vars

Role default variables from `defaults/main.yml`.

```yaml
mongoc_backup_dir: /srv/backup/mongoc
mongoc_port: 27019

mongod_backup_dir: /srv/backup/mongod
mongod_port: 27018

mongos_port: 27017

mongodb_backup_pass: backup_pass
mongodb_backup_user: backup_user

aws_access_key: someaccesskey
aws_secret_key: somesecretkey
aws_region: someregion
mongodb_backup_s3_bucket: mongodb-bucket
mongodb_backup_s3_key_prefix: keyprefix
```

### Mandatory variables

```
- mongodb_backup_pass
- mongodb_backup_user
- aws_access_key
- aws_secret_key
- aws_region
- mongodb_backup_s3_bucket
- mongodb_backup_s3_key_prefix
```

### Context variables

Those variables from `vars/*.{yml,json}` are loaded dynamically during task
runtime using the `include_vars` module.

Variables loaded from `vars/main.yml`.

```yaml
mongodb_connection:
  mongo --quiet --username {{ mongodb_backup_user }} --password
  {{ mongodb_backup_pass }} {{ mongo_host }}:{{ mongo_port }}/admin

mongodb_shell:
  get_user: '{{ mongodb_connection }} --eval "rs.slaveOk(); db.getUser(''{{ mongodb_backup_user }}'');"'
  check_mongos_balancer_status: "{{ mongodb_connection }} --eval 'sh.status()' | grep 'balancer:' -A 3"
  stop_mongos_balancer: "{{ mongodb_connection }} --eval 'sh.stopBalancer();'"
  start_mongos_balancer: "{{ mongodb_connection }} --eval 'sh.setBalancerState(true);'"
  check_replset_secondary: '{{ mongodb_connection }} --eval "db.isMaster()[''secondary'']"'
  lock_secondary_replset: "{{ mongodb_connection }} --eval 'db.fsyncLock();'"
  unlock_secondary_replset: "{{ mongodb_connection }} --eval 'db.fsyncUnlock();'"
  get_lock_status_secondary_replset: '{{ mongodb_connection }} --eval "{{ lookup(''file'', ''11-get-fsynclock-status.js'') }}"'
```

## License

GPLv2.

## Author Information

Thiago Almeida "thiagoalmeidasa@gmail.com".
