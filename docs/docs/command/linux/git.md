# git

## 设置
- git --global user.name"username" `全局用户名`
- git --global user.email "email" `全局邮箱`

## 单个
- git init --bare `bare初始化`
- git add .
- git log --oneline
- git log -p `查看提交记录`
- git reset --hard HEAD `HEAD是文件状态`
- git reflog
- git merge --no-ff -m "keep merge info" dev `保留 merge 信息`
- git rebase dev `新合并`
- git remote add origin https://github.com/MorvanZhou/git-demo.git

## 分类

### commit
- git commit --amend --no-edit `--no-edit: 不编辑, 直接合并到上一个 commit`
- git commit -m "change 1"

### branch
- git branch dev `建立dev分支`
- git branch `查看当前分支`

### checkout
- git checkout c6762a1 -- 1.py
- git checkout -b boss `创建分支`
- git checkout dev `切换分支`

### push
- git push origin master `推到我的 origin`
- git push -u origin master `推送本地 master 去 origin`
- git push -u origin dev `推送本地 dev 去 origin`
- git push -u origin master `推送修改`

### diff
- git diff HEAD
- git diff
- git diff --cached

### stash
- git stash list `查看在 stash 中的缓存`
- git stash pop
- git status -s

## 项目的历史代码中任意穿梭

- 列出你在 Git 上的所有操作记录 `git reflog`
-  找到 HEAD@{index} 前面所对应的操作索引，并使用下面命令即可 `git reset HEAD@{index}`

## 想改个小东西，但代码不小心提交（commit）

- 添加下当前已改动的代码 `git add .`
- 把你刚刚添加的代码合并到最后一次提交上 `git commit --amend`

## 刚刚写的提交历史写得不够好，想重写一下

- 重写提交历史 `git commit --amend`

## 不小心把新分支的代码提交到主分支上了

- 先创建个新分支（some-new-branch-name）`git branch some-new-branch-name`
- 把刚才的提交从主分支中移除 `git reset HEAD~ --hard`


## 把代码提交到错误的分支上

- 先撤销最后一次提交，但保留变更代码

```git
git reset HEAD~ --soft
git stash
```

- 再切到你想要提交的正确分支（name-of-the-correct-branch）上，并把变更代码提交上去

```git
git checkout name-of-the-correct-branch
git stash pop
git add .
git commit -m "your message here"

```

## 提交代码

- git pull -- rebase # rebase 可以减少 merger commit 的 log

## git settings proxy

``` bash
git config --global https.proxy http://127.0.0.1:1080

git config --global https.proxy https://127.0.0.1:1080

git config --global --unset http.proxy

git config --global --unset https.proxy

npm config delete proxy
```
