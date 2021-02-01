# [hackettyu'snippets] Javascript 返回一个包含当前 URL 参数的对象

```js
const getURLParameters = url =>
url.match(/([^?=&]+)(=([^&]*))/g).reduce(
(a, v) => (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a), {}
);
// getURLParameters('http://url.com/page?name=Adam&surname=Smith') -> {name: 'Adam', surname: 'Smith'}
```