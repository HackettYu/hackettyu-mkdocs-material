# Github PR workflow | 个人提交 PR 工作流

> Descirption: Github PR workflow，使用 git rebase 保持干净的主干分支

## Basic 

```bash
# 拉取主仓库
git clone -b {{master or main}} https://github.com/HackettYu/mkdocs-material
# 添加 Remote
git remote add origin https://github.com/{{username}}/mkdocs-material # 克隆仓库
git remote add upstream https://github.com/HackettYu/mkdocs-material # 贡献仓库

# 抓取更新
git fetch upstream main # or git fetch upstream master

# Rebase 变基
git checkout main # or git checkout master 确定只保持主干分支为最新远程仓库的修改内容
git rebase upstream/main # or git rebase upstream/master

# 新建需要 PR 的分支，并切换至新分支
git checkout -b {{dev}}

# 在 dev 分支修改代码（建议本地主分支不修改本地代码）
cd mkdocs-material
echo 'some stuffs' > file.txt
# 提交代码
git add -A file.txt # or .
git commit -am "Added: some stuffs"

# 推送代码
# git branch -v
# git log
# git diff <branch> <filename>
git push origin {{dev}} # 推送到克隆的个人仓库，可以在 Github 中 PR
# git push upstream main ???
```

## Extention

1. PR => Pull Request => 拉取请求
2. `git cherry-pick <commitHash>`
3. 可以考虑用 git merge 的方式