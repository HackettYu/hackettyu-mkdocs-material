# docker

## docker postgres database backup

- docker-compose stop

移动 Postgres 数据卷 ~/postgres/data/（或者你在 docker-compose 中指定的目录）至其他任何地方作为备份，这非常重要！
执行如下命令来导出所有数据：

- docker exec postgres pg_dumpall -c -U postgres > export.sql

根据最新 docker-compose.yml
中的database.postgres 部份来更新你的 docker-compose 文件，并启动:

- docker-compose up -d

执行如下命令来导入所有数据：

- cat export.sql | docker exec -i postgres psql -U postgres