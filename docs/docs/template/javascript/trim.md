# [hackettyu'snippets] Javascript trim method

> 兼容的 trim()

```js
String.prototype.trim = function() {
	return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}
```