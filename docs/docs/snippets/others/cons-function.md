---
title: case function
description: [hackettyu'snippets]
---

> description: [hackettyu'snippets]

```js
function getStatus(action) {
    switch(action) {
        case "ON":
            return "1"
        case "OFF"
            return "0"
        default:
            return ""
    }
}

// turn to this
const STATUS = {
    "ON": "1",
    "OFF": "0",
    "DEFAULT": ""
}
function getStatus(action = STATUS.DEFAULT ) {
    return STATUS[action]
}
```
