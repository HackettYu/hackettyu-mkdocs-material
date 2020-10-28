# [转载] bilibili 正则

> [VIA](https://www.bilibili.com/read/cv731679/)

``` xml
<filters>
    <!-- my ban list -->
    <item enabled="true">r=没那味儿</item>
    <item enabled="true">r=^(.)\1+$</item>    <!-- 111 aaa 哈哈哈 -->
    <item enabled="true">r=.+爱了.+</item>    <!-- 爱了 -->
    <item enabled="true">r=.+小姐姐.+</item>    <!-- 小姐姐 -->
    <item enabled="true">r=.+小哥哥.+</item>    <!-- 小哥哥 -->
    <item enabled="true">r=awsl</item>    <!-- awsl -->
    <item enabled="true">r=加油</item>    <!-- 加油 -->

    <!-- INCLUDE VIA https://github.com/xmcp/bilibili-ban-list/blob/master/tv.bilibili.player.xml -->
    <!-- 无意义弹幕 -->
    <item enabled="true">r=.{50}</item>    <!-- 超长弹幕 -->
    <item enabled="true">r=^[\.。,，\/\?？!！~～@\^、+=\-_ ]+$</item>    <!-- 无意义符号 -->
    <item enabled="true">r=^[^\u4E00-\u9FA5]$</item>    <!-- 单个非中文字符 -->

    <!-- 建筑美 -->
    <item enabled="true">r=弹\s*[屏幕][^护]*$</item>    <!-- 弹幕墙、弹幕测试…… 防止误伤弹幕护体 -->
    <item enabled="true">t=倍速</item>
    <item enabled="true">r=[3３三立]\s+[dDＤ体體]</item>    <!-- 立  体  弹  幕 -->
    <item enabled="true">r=(^|是)..[红橙黄绿青蓝紫黑白灰].{0,2}$</item>    <!-- 颜色 -->

    <!-- 播放相关 -->
    <item enabled="true">r=^[第前]([0-9零一二两三四五六七八九十百千万亿].{0,6})?$</item>
    <item enabled="true">r=^.{1,6}[天时点分钟秒]前</item>
    <item enabled="true">r=^[0-9零一二两三四五六七八九十百千万亿nN]{1,4}(刷|周[木目])$</item>
    <item enabled="true">r=破.*[wW万萬]</item>
    <item enabled="true">r=[wW万萬]助攻</item>
    <item enabled="true">r=钟的?诅咒</item>
    <item enabled="true">r=口[气氣].*[集级]</item>
    <item enabled="true">t=完结</item>
    <item enabled="true">t=撒花</item>
    <item enabled="true">t=从左到右</item>
    <item enabled="true">r=[0-9万名].{1,6}[伴你们人友]($|.*[豪嚎号好])</item>    <!-- 12450个小伙伴好 -->

    <!-- 空降 -->
    <item enabled="true">r=降.{0,3}(成功|失败|完美)</item>
    <item enabled="true">t=完美空降</item>
    <item enabled="true">r=空难(现场|$)</item>

    <!-- 漂移 -->
    <item enabled="true">r=[漂飘飄飙][移逸遗]</item>
    <item enabled="true">r=[左右][漂飘飄飙]</item>
    <item enabled="true">r=(\s|^|[我怎来会].?)[漂飘飄飙]+($|.?[～~?？。，啊]|\s)</item>
    <item enabled="true">r=\s{5}</item>

    <!-- 跟风刷屏 -->
    <item enabled="true">r=入(宅|坑$)</item>    <!-- xx（作品名）入宅 -->
    <item enabled="true">r=^什么[!\?！？，,、~\s]</item>    <!-- 什么？xxxx了！？ -->
    <item enabled="true">r=^《.*》$</item>    <!-- 书名刷屏 -->
    <item enabled="true">r=^告诉.*[我还永]</item>    <!-- 告诉xx我爱她 -->
    <item enabled="true">r=暴[露漏]((补番)?时间)?[了乐啦拉]</item>    <!-- 我也暴露了 -->
    <item enabled="true">r=周目($|.*(我|回|起|报|人|过|来|此))</item>    <!-- N周目加我一个 -->
    <item enabled="true">r=つロ|[干肝乾]杯</item>    <!-- bilibili干杯 -->
    <item enabled="true">r=[马馬][冬东]|[冬东]梅|[马馬]什么梅</item>
    <!-- <item enabled="true">r=[拉啦雷蕾][姆母拇]</item> -->
    <!-- <item enabled="true">r=170001</item> -->

    <!-- 无意义撕逼 -->
    <item enabled="true">r=[fF]{3}.*(真爱|百合|基|性恋)</item>    <!-- 不烧真爱的FFF团不是真正的FFF团 -->
    <item enabled="true">r=豆腐.*[酸甜苦辣咸臭糖盐醋吃加]</item>
    <item enabled="true">r=[酸甜苦辣咸臭糖盐醋吃加].*豆腐</item>    <!-- 要是B站的正则支持负向零宽断言，其实是可以写在一行里的 -->
    <item enabled="true">r=我的?(床上|老婆)</item>    <!-- 你们都错了，蕾姆其实在我床上 -->
    <item enabled="true">t=我选</item>    <!-- 说得好，我选择xxx -->

    <!-- 日期相关 -->
    <item enabled="true">r=(\d{1,2}|十|十?[一二三四五六七八九十])([\.,\/:：、，；点\-月。]|\s+)(\d{1,2}|[二三]?十|[二三]?十?[一二三四五六七八九]).{0,4}($|[日的过我别你上午夜晨])</item>    <!-- 1月11的路过 -->
    <item enabled="true">r=\d\d(\d\d)?([\.,。，、\/\-年—*]|\s+)\d(\d)?([\.,。，、\/\-月—*]|\s+)\d</item>    <!-- 2000.1.11路过 -->
    <item enabled="true">r=^(2([^3]\d|3[^3])|6([^6]\d|6[^6])|[^26]\d{2})\d{0,5}$</item>    <!-- ^(?!233|666)\d{3,8}$，屏蔽20160101 -->
    <item enabled="true">r=(元旦|年|国庆|春|秋|圣诞).?快乐</item>


</filters>
```
