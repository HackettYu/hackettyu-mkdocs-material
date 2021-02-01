# spotdl

> spotify 下载器
>
> <https://github.com/ritiek/spotify-downloader>

- install

  `pip3 install spotdl`

- download single

  ```bash
  $ spotdl --song https://open.spotify.com/track/2DGa7iaidT5s0qnINlwMjJ
  $ spotdl --song "ncs - spectre"
  ```

- download list

  ```bash
  $ spotdl --playlist https://open.spotify.com/user/nocopyrightsounds/playlist/7sZbq8QGyMnhKPcLJvCUFD
  INFO: Writing 62 tracks to ncs-releases.txt
  $ spotdl --list ncs-releases.txt
  ```

- save in `/root/Music` default