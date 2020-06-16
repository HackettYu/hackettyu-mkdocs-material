# ttrss

- docker run -d --link ttrssdb:db -p 80:80 -e SELF_URL_PATH=${URL}/ttrss fischerman/docker-ttrss `开启 ttrss`
- docker cp tt-rss-feedly-theme-master/feedly e68a936a202d :/var/www/themes `安装主题`