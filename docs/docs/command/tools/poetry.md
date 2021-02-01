# Poetry

example for pyproject.toml

```toml
[tool.poetry]
name = "demo-get-zendao-weekly-by-selenium"
version = "0.1.0"
description = ""
authors = ["hackettyu <hy.lobby@gmail.com>"]

[tool.poetry.dependencies]
python = "^3.8"
selenium = "^3.141.0"
request = "^2019.4.13"
tabulate = "^0.8.7"

[[tool.poetry.source]]
name = "douban"
url = "https://pypi.doubanio.com/simple"

[tool.poetry.dev-dependencies]

[build-system]
requires = ["poetry>=0.12"]
build-backend = "poetry.masonry.api"
```

## commands

```bash
# 安装 poetry
pip install --user poetry -i https://pypi.doubanio.com/simple

# 新建项目
poetry new project-name

# 安装依赖
poetry insatll

# 查看配置
poetry config --list

# 内置安装
poetry config virtualenvs.in-project true
```

```conf
virtualenvs.create: boolean
Create a new virtual environment if one doesn't already exist. Defaults to true.

virtualenvs.in-project: boolean
Create the virtualenv inside the project's root directory. Defaults to false.

virtualenvs.path: string
Directory where virtual environments will be created. Defaults to {cache-dir}/virtualenvs ({cache-dir}\virtualenvs on Windows).
```

## REFERENCE

- [poetry configuration](https://python-poetry.org/docs/configuration/)