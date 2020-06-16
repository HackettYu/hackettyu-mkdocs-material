# js ajax 跨域请求 

默认情况下，JavaScript在发送AJAX请求时，URL的域名必须和当前页面完全一致。
通过在同源域名下架设一个代理服务器来转发，JavaScript负责把请求发送到代理服务器
`/proxy?url=http://www.sina.com.cn`

```js
$(function () {
    var jsons = {
        'blogs': [{ 'id': 'xiaoming', 'name': '小明' }, { 'id': '2', 'name': '小明1' }, 
                   { 'id': '3', 'name': '小明2'}]
    };
    $.each(jsons.blogs, function (index, e) {
        $("#sel").append("<option value=" + e.id + ">" + e.name + "</option>");
    });
});

$.ajax({
  url: "test.html",
  context: document.body
}).done(function() {
  $(this).addClass("done");
});
```