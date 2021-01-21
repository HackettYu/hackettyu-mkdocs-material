# Use JSON schema in VSCode

> Date: 2021-01-12

## Quick start

1. 配置 schema

=== "文件目录"

    ```txt
    .
    |-- .vscode
    |   |               `-- schema.json
    |                   `-- settings.json
    |-- foo.json
    ```

=== "schema.json"

    ```json

    ```

=== "settings.json"

    ```json
    {
        "json.schemas": [
            {
                "fileMatch": [
                    "/*.json"
                ],
                "url": "./.vscode/schema.json"
            }
        ]
    }
    ```

    `json.schemas>fileMatch` 是指匹配的文件，支持通配符
    `json.schemas>url` 是指 schema 文件存放的位置

2. 用 VSCode 打开当前工程目录

```bash
code .
```

## JSON Schema

**定义属性（properties）**

>properties>{{propertie}}>description 描述
>properties>{{propertie}}>type 类型
>properties>{{propertie}}>required 必填

> The value of this keyword MUST be either a string or an array. If it is an array, elements of the array MUST be strings and MUST be unique.

> String values MUST be one of the six primitive types ("null", "boolean", "object", "array", "number", or "string"), or "integer" which matches any number with a zero fractional part.

=== "数组"
    ```json
    {
        "tags": {
            "description": "Tags for the product",
            "type": "array",
            "items": {
                "type": "string"
            },
            "minItems": 1,
            "uniqueItems": true
        }
    }
    ```

=== "number"
    ```json
    {
        "price": {
            "description": "The price of the product",
            "type": "number",
            "exclusiveMinimum": 0
        }
    }



## VSCode exmaples

**定义 snippets**

```json
{
    "type": "array",
    "title": "Keybindings configuration",
    "items": {
        "type": "object",
        "required": ["key"],
        "defaultSnippets": [
            {
                "label": "New keybinding",
                "description": "Binds a key to a command for a given state",
                "body": { "key": "$1", "command": "$2", "when": "$3" }
            }
        ],
        "properties": {
            "key": {
                "type": "string"
            }
        }
    }
}
```

`items>defaultSnippets>lable` 指的是弹出的提示内容
`items>defaultSnippets>body` 指的是回车后输出的内容，`$1` 为变量

> Body:  is the JSON object that is stringified and inserted when the completion is selected by the user. Snippet syntax can be used inside strings literals to define tabstops, placeholders, and variables. If a string starts with ^, the string content will be inserted as-is, not stringified. You can use this to specify snippets for numbers and booleans.

**使用 markdown 文本 hover**

```diff
{
  "$schema": "http://json-schema.org/schema",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "The name of the entry",
+      "markdownDescription": "The name of the entry. [See the documentation](https://example.com)"
    }
  }
}
```



## Reference

> https://code.visualstudio.com/Docs/languages/json
> https://json-schema.org/draft/2019-09/json-schema-validation.html
> http://json-schema.org/learn/getting-started-step-by-step.html

> http://json-schema.org/learn/getting-started-step-by-step.html
> 