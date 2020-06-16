# bypy

> 命令行百度云盘

- install

  `pip install bypy`

- usage

  显示在云盘（程序的）根目录下文件列表：

  ```bash
  bypy list
  ```

  把当前目录同步到云盘：

  ```
  bypy syncup
  ```

  or

  ```
  bypy upload
  ```

  把云盘内容同步到本地来：

  ```
  bypy syncdown
  ```

  or

  ```
  bypy downdir /
  ```

  比较本地当前目录和云盘（程序的）根目录（个人认为非常有用）：

  ```
  bypy compare
  ```