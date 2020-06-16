# 使用 Javascript 获取 m3u8

> VIA:https://nilaoda.github.io/N_m3u8DL-CLI/GetM3u8.html

本页将提供一些JS代码，在您的浏览器运行这些代码有助于更快的获取到m3u8链接用以下载。
为了方便使用，最好将下面的JS代码存为书签。

注意：

    所有代码仅供学习，请勿用于任何违法途径
    本页Javascript代码更新于2019年9月21日，测试于360极速浏览器，其他浏览器不保证正常使用

- 腾讯视频

可直接将这个超链接拖入你的书签栏：腾讯视频

``` javascript
javascript:prompt(PLAYER._DownloadMonitor.context.dataset.title,PLAYER._DownloadMonitor.context.dataset.currentVideoUrl);
```

- 优酷视频

可直接将这个超链接拖入你的书签栏：优酷视频

``` javascript
javascript:var url;var size=0;Array.from(videoPlayer.getData()._playlistData.stream).forEach(function(element,index,array){if(element.audio_lang==videoPlayer.getConfig().language&&element.size>size){url=element.m3u8_url;size=element.size}});/*nilaoda*/prompt(videoPlayer.getData()._videoData.title+"_"+videoPlayer.getConfig().language+"_"+(size/1024/1024).toFixed(2)+"MB",url);
```

补充说明 (20191016)：

目前部分优酷视频使用了其自有DRM加密，下载器暂时无法解密。不过使用火狐浏览器的UA(Mozilla/5.0 (Windows NT 10.0; win64; x64; rv:69.0) Gecko/20100101 Firefox/69.0)播放视频可以获取到

``` javascript
http://pl-ali.youku.com/playlist/m3u8?vid=XNDMwMDI5MDE1Mg&type=……
```

形式的m3u8的链接，此种格式的链接就可以使用本下载器正常下载。
爱奇艺/愛奇藝视频

可直接将这个超链接拖入你的书签栏：爱奇艺视频

``` javascript
javascript:try{var info=playerObject._player._core._movieinfo.originalData.data.program.video;info.forEach(function(item,index){if(item._selected){var m3u8Content="";if(item.m3u8==undefined){try{if(typeof(eval(cmd5x))=="function"){}}catch(e){var req1=new XMLHttpRequest();req1.open("GET","https://static.iqiyi.com/js/common/f6a3054843de4645b34d205a9f377d25.js",false);req1.onload=function(){var script=document.createElement("script");script.text=req1.responseText;document.getElementsByTagName("head")[0].appendChild(script)};req1.send(null)}var fs=item.fs;var content="#EXTM3U\n";fs.forEach(function(fs_i,fs_index){var url=fs_i.l;var prefix="https://data.video.iqiyi.com/videos";var api=prefix+url;try{var t=playerObject._player._core._movieinfo.originalData.data.boss.data.t;api=prefix+url+"&cross-domain=1&t="+t+"&QY00001="+/qd_uid=(\d+)/g.exec(url)[1]+"&ib=4&ptime=0&ibt="+cmd5x(t+/\/(\w{10,})/g.exec(url)[1])}catch(err){}var req=new XMLHttpRequest();req.overrideMimeType("application/json");req.open("GET",api,false);req.onload=function(){var jsonResponse=JSON.parse(req.responseText);content+="#EXTINF:0\n"+jsonResponse["l"]+"\n"};req.send(null)});content+="#EXT-X-ENDLIST";m3u8Content=content}else{m3u8Content=item.m3u8}var blob=new Blob([m3u8Content],{type:"text/plain"});var url=URL.createObjectURL(blob);var title=(document.title.indexOf("-")!=-1?document.title.substring(0,document.title.indexOf("-")):document.title.replace(/\s/,""))+"_"+item.scrsz+"_"+(item.code==2?"H264":"H265")+"_"+document.getElementsByClassName("iqp-time-dur")[0].innerText.replace(/:/,".")+"_"+(item.vsize/1024/1024).toFixed(2)+"MB.m3u8";var aLink=document.createElement("a");aLink.href=url;aLink.download=title;aLink.style.display="none";var event;if(window.MouseEvent){event=new MouseEvent("click")}else{event=document.createEvent("MouseEvents");event.initMouseEvent("click",true,false,window,0,0,0,0,0,false,false,false,false,0,null)}aLink.dispatchEvent(event)}})}catch(err){var info1=playerObject._player.package.engine.adproxy.engine.movieinfo.vidl;info1.forEach(function(item1,index1){if(item1.responseData!=undefined){var info=item1.responseData.data.program.video;info.forEach(function(item,index){if(item._selected){var m3u8Content="";if(item.m3u8==undefined){try{if(typeof(eval(cmd5x))=="function"){}}catch(e){var req1=new XMLHttpRequest();req1.open("GET","https://static.iqiyi.com/js/common/f6a3054843de4645b34d205a9f377d25.js",false);req1.onload=function(){var script=document.createElement("script");script.text=req1.responseText;document.getElementsByTagName("head")[0].appendChild(script)};req1.send(null)}var fs=item.fs;var content="#EXTM3U\n";fs.forEach(function(fs_i,fs_index){var url=fs_i.l;var prefix="https://data.video.iqiyi.com/videos";var api=prefix+url;try{var t=playerObject._player.package.engine.adproxy.engine.movieinfo.current.boss.data.t;api=prefix+url+"&cross-domain=1&t="+t+"&QY00001="+/qd_uid=(\d+)/g.exec(url)[1]+"&ib=4&ptime=0&ibt="+cmd5x(t+/\/(\w{10,})/g.exec(url)[1])}catch(err){console.error(err)}var req=new XMLHttpRequest();req.overrideMimeType("application/json");req.open("GET",api,false);req.onload=function(){var jsonResponse=JSON.parse(req.responseText);content+="#EXTINF:0\n"+jsonResponse["l"]+"\n"};req.send(null)});content+="#EXT-X-ENDLIST";m3u8Content=content}else{m3u8Content=item.m3u8}var blob=new Blob([m3u8Content],{type:"text/plain"});var url=URL.createObjectURL(blob);var title=(document.title.indexOf("-")!=-1?document.title.substring(0,document.title.indexOf("-")):document.title.replace(/\s/,""))+"_"+item.scrsz+"_"+(item.code==2?"H264":"H265")+"_"+document.getElementsByClassName("iqp-time-dur")[0].innerText.replace(/:/,".")+"_"+(item.vsize/1024/1024).toFixed(2)+"MB.m3u8";/*nilaoda*/var aLink=document.createElement("a");aLink.href=url;aLink.download=title;aLink.style.display="none";var event;if(window.MouseEvent){event=new MouseEvent("click")}else{event=document.createEvent("MouseEvents");event.initMouseEvent("click",true,false,window,0,0,0,0,0,false,false,false,false,0,null)}aLink.dispatchEvent(event)}})}})}
```

- 爱奇艺/愛奇藝 杜比音轨

可直接将这个超链接拖入你的书签栏：爱奇艺杜比音轨

``` javascript
javascript:eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('3 B=A 1k();B.1j("1h","R://2I.M.C/1c/1Q/2b.1c",9);B.1b=7(){3 a=6.Q("19");a.1m=B.Z;6.V("U")[0].S(a)};B.18(z);7 G(a){3 b=6.2S.14("; ");1K(3 i=0;i<b.1Y;i++){3 c=b[i].14("=");J(a==c[0])K 1d(c[1])}K z}7 N(a,b){3 c=A 1U(\'(^|&)\'+a+\'=([^&]*)(&|$)\',\'i\');3 r=b.22(c);J(r!=z){K 1d(r[2])}K z}3 L=8.2T.15.O("1L.M.C")!=-1?"1M":"1O";3 F=1R.1S.1T.1a.1X.1a.F;3 P="/1Z/20?1e="+F.1e+"&24=26&27=28&D="+F.D+"&L="+L+"&2d=0&2e=1&2h="+G("2i")+"&2x=2y&2E=0&T="+G("2M")+"&2R=0&d=0&s=&1n=&1o=&1p=&1q=1&1r=0&1s=0&1t="+G("1u")+"&1v=1w&1x=0&1y=2&1z="+(A 2Z()).1B()+"&1C=a&1D=0&1E=1F&1G=1H&1I=1&1J=W&Y=1&Y=5";8.I="R://1N.11.M.C"+P+"&1P="+12(P);13(8.I);7 13(a){3 b=6.V("U")[0];3 c=6.Q("19");c.L=a;b.S(c)}7 W(e){3 x=e.H.1V.1W;3 y=0;x.17(7(m,n){J(m.21){3 o=m.23;3 p="#25\\n";o.17(7(b,c){3 f=b.l;y+=b.b;3 h="R://H.11.M.C/29";3 i=h+f;2a{3 t=e.H.2c.H.t;3 j=N("D",8.I);3 k=N("T",8.I);i=h+f+"&t="+t+"&D="+j+"&2f="+/2g=(\\d+)/g.1f(f)[1]+"&2j="+k+"&2k=4&2l="+12(t+/\\/(\\w{10,})/g.1f(f)[1])+"&2m=0"}2n(2o){}3 l=A 1k();l.2p("2q/2r");l.1j("1h",i,9);l.1b=7(){3 a=2s.2t(l.Z);p+="#2u:0\\n"+a["l"]+"\\n"};l.18(z)});p+="#2v-X-2w";1g=p;3 q=A 2z([1g],{2A:"1m/2B"});3 r=2C.2D(q);3 s=(6.E.O("-")!=-1?6.E.2F(0,6.E.O("-")):6.E.2G(/\\s/,""))+"2H"+(y/1i/1i).2J(2)+"2K.2L";3 u=6.Q("a");u.15=r;u.2N=s;u.2O.2P="2Q";3 v;J(8.1l){v=A 1l("16")}2U{v=6.2V("2W");v.2X("16",2Y,9,8,0,0,0,0,0,9,9,9,9,0,z)}u.1A(v)}})}',62,186,'|||var|||document|function|window|false||||||||||||||||||||||||||null|new|req1|com|vid|title|movieinfo|getCookie|data|dashUrl|if|return|src|iqiyi|getQueryString|indexOf|params|createElement|https|appendChild|k_uid|head|getElementsByTagName|NILAODA||ut|responseText||video|cmd5x|loadScript|split|href|click|forEach|send|script|engine|onload|js|unescape|tvid|exec|m3u8Content|GET|1024|open|XMLHttpRequest|MouseEvent|text|lid|cf|ct|k_tag|ost|ppt|dfp|__dfp|locale|zh_cn|k_err_retries|qd_v|tm|dispatchEvent|getTime|qdy|qds|k_ft1|1354994433|k_ft4|8196|k_ft5|callback|for|tw|01010031010010000000|cache|01010031010000000000|vf|common|playerObject|_player|package|RegExp|program|audio|adproxy|length|jp|dash|_selected|match|fs|bid|EXTM3U|300|abid|500|videos|try|f6a3054843de4645b34d205a9f377d25|boss_ts|vt|rs|QY00001|qd_uid|uid|P00003|su|ib|ibt|ptime|catch|err|overrideMimeType|application|json|JSON|parse|EXTINF|EXT|ENDLIST|ori|pcw|Blob|type|plain|URL|createObjectURL|ps|substring|replace|_dolby_|static|toFixed|MB|m3u8|QC005|download|style|display|none|pt|cookie|location|else|createEvent|MouseEvents|initMouseEvent|true|Date'.split('|'),0,{}))
```

- 爱奇艺/愛奇藝 4K H264

可直接将这个超链接拖入你的书签栏：爱奇艺4K_H264

``` javascript
javascript:eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('3 j=k 1e();j.1E("1J","S://14.y.x/N/1K/1W.N",7);j.11=6(){3 a=5.w("E");a.z=j.2i;5.L("F")[0].B(a)};j.1f(9);6 m(a){3 b=5.1P.G("; ");1Y(3 i=0;i<b.W;i++){3 c=b[i].G("=");q(a==c[0])t R(c[1])}t 9}6 1g(a,b){3 c=k 1C(\'(^|&)\'+a+\'=([^&]*)(&|$)\',\'i\');3 r=b.1G(c);q(r!=9){t R(r[2])}t 9}3 p=8.1V.P.u("1Z.y.x")!=-1?"2a":"2d";3 n=2j.2k.V.A.X.A.n;3 v="/Z/10?C="+n.C+"&12=13&D="+n.D+"&p="+p+"&15=0&16=1&17="+m("18")+"&19=1a&1b=0&1c="+m("1d")+"&2q=0&d=0&s=&1h=&1i=&1j=&1k=1&1l=0&1m=0&1n="+m("1o")+"&1p=1q&1r=0&1s=2&1t="+(k 1u()).1v()+"&1w=a&1x=0&1y=1z&1A=4&1B=H&1D=1";8.I="S://1F.J.y.x"+v+"&1H="+1I(v);K(8.I);6 K(a){3 b=5.L("F")[0];3 c=5.w("E");c.p=a;b.B(c)}6 H(e){3 i=e.1L.1M.J;i.1N(6(a,b){q(a.1O){3 c=a.M;3 d=k 1Q([c],{1R:"z/1S"});3 e=1T.1U(d);3 f=(5.o.u("-")!=-1?5.o.1X(0,5.o.u("-")):5.o.O(/\\s/,""))+"l"+a.20+"l"+(a.21==2?"22":"23")+"l"+5.24("25-26-27")[0].28.O(/:/,".")+"l"+(a.29/Q/Q).2b(2)+"2c.M";3 g=5.w("a");g.P=e;g.2e=f;g.2f.2g="2h";3 h;q(8.T){h=k T("U")}2l{h=5.2m("2n");h.2o("U",2p,7,8,0,0,0,0,0,7,7,7,7,0,9)}g.Y(h)}})}',62,151,'|||var||document|function|false|window|null||||||||||req1|new|_|getCookie|movieinfo|title|src|if|||return|indexOf|params|createElement|com|iqiyi|text|engine|appendChild|tvid|vid|script|head|split|NILAODA|dashUrl|video|loadScript|getElementsByTagName|m3u8|js|replace|href|1024|unescape|https|MouseEvent|click|package|length|adproxy|dispatchEvent|jp|dash|onload|bid|800|static|vt|rs|uid|P00003|ori|pcw|ps|k_uid|QC005|XMLHttpRequest|send|getQueryString|lid|cf|ct|k_tag|ost|ppt|dfp|__dfp|locale|zh_cn|k_err_retries|qd_v|tm|Date|getTime|qdy|qds|k_ft2|8196|k_ft4|callback|RegExp|ut|open|cache|match|vf|cmd5x|GET|common|data|program|forEach|_selected|cookie|Blob|type|plain|URL|createObjectURL|location|f6a3054843de4645b34d205a9f377d25|substring|for|tw|scrsz|code|H264|H265|getElementsByClassName|iqp|time|dur|innerText|vsize|03020031010010000000|toFixed|MB|03020031010000000000|download|style|display|none|responseText|playerObject|_player|else|createEvent|MouseEvents|initMouseEvent|true|pt'.split('|'),0,{}))
```

- 爱奇艺/愛奇藝 4K H265

可直接将这个超链接拖入你的书签栏：爱奇艺4K_H265

``` javascript
javascript:eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('3 9=j 1c();9.1C("1H","R://13.x.w/M/1I/1U.M",6);9.10=5(){3 a=4.v("D");a.y=9.2g;4.K("E")[0].A(a)};9.1e(8);5 l(a){3 b=4.1N.F("; ");1W(3 i=0;i<b.V;i++){3 c=b[i].F("=");p(a==c[0])q Q(c[1])}q 8}5 1f(a,b){3 c=j 1A(\'(^|&)\'+a+\'=([^&]*)(&|$)\',\'i\');3 r=b.1E(c);p(r!=8){q Q(r[2])}q 8}3 o=7.1T.O.t("1X.x.w")!=-1?"28":"2b";3 m=2h.2i.U.z.W.z.m;3 u="/Y/Z?B="+m.B+"&11=12&C="+m.C+"&o="+o+"&14=0&15=1&16="+l("17")+"&18=19&1a=0&1b="+l("2o")+"&1d=0&d=0&s=&1g=&1h=&1i=&1j=1&1k=0&1l=0&1m="+l("1n")+"&1o=1p&1q=0&1r=2&1s="+(j 1t()).1u()+"&1v=a&1w=0&1x=1y&1z=G&1B=1";7.H="R://1D.I.x.w"+u+"&1F="+1G(u);J(7.H);5 J(a){3 b=4.K("E")[0];3 c=4.v("D");c.o=a;b.A(c)}5 G(e){3 i=e.1J.1K.I;i.1L(5(a,b){p(a.1M){3 c=a.L;3 d=j 1O([c],{1P:"y/1Q"});3 e=1R.1S(d);3 f=(4.n.t("-")!=-1?4.n.1V(0,4.n.t("-")):4.n.N(/\\s/,""))+"k"+a.1Y+"k"+(a.1Z==2?"20":"21")+"k"+4.22("23-24-25")[0].26.N(/:/,".")+"k"+(a.27/P/P).29(2)+"2a.L";3 g=4.v("a");g.O=e;g.2c=f;g.2d.2e="2f";3 h;p(7.S){h=j S("T")}2j{h=4.2k("2l");h.2m("T",2n,6,7,0,0,0,0,0,6,6,6,6,0,8)}g.X(h)}})}',62,149,'|||var|document|function|false|window|null|req1||||||||||new|_|getCookie|movieinfo|title|src|if|return|||indexOf|params|createElement|com|iqiyi|text|engine|appendChild|tvid|vid|script|head|split|NILAODA|dashUrl|video|loadScript|getElementsByTagName|m3u8|js|replace|href|1024|unescape|https|MouseEvent|click|package|length|adproxy|dispatchEvent|jp|dash|onload|bid|800|static|vt|rs|uid|P00003|ori|pcw|ps|k_uid|XMLHttpRequest|pt|send|getQueryString|lid|cf|ct|k_tag|ost|ppt|dfp|__dfp|locale|zh_cn|k_err_retries|qd_v|tm|Date|getTime|qdy|qds|k_ft2|8191|callback|RegExp|ut|open|cache|match|vf|cmd5x|GET|common|data|program|forEach|_selected|cookie|Blob|type|plain|URL|createObjectURL|location|f6a3054843de4645b34d205a9f377d25|substring|for|tw|scrsz|code|H264|H265|getElementsByClassName|iqp|time|dur|innerText|vsize|03020031010010000000|toFixed|MB|03020031010000000000|download|style|display|none|responseText|playerObject|_player|else|createEvent|MouseEvents|initMouseEvent|true|QC005'.split('|'),0,{}))
```

- 爱奇艺/愛奇藝 1080P H265 (低码)

可直接将这个超链接拖入你的书签栏：爱奇艺1080P_H265(低码)

``` javascript
javascript:eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('3 9=j 1c();9.1C("1H","R://13.x.w/M/1I/1U.M",6);9.10=5(){3 a=4.v("D");a.y=9.2g;4.K("E")[0].A(a)};9.1e(8);5 l(a){3 b=4.1N.F("; ");1W(3 i=0;i<b.V;i++){3 c=b[i].F("=");p(a==c[0])q Q(c[1])}q 8}5 1f(a,b){3 c=j 1A(\'(^|&)\'+a+\'=([^&]*)(&|$)\',\'i\');3 r=b.1E(c);p(r!=8){q Q(r[2])}q 8}3 o=7.1T.O.t("1X.x.w")!=-1?"28":"2b";3 m=2h.2i.U.z.W.z.m;3 u="/Y/Z?B="+m.B+"&11=12&C="+m.C+"&o="+o+"&14=0&15=1&16="+l("17")+"&18=19&1a=0&1b="+l("2o")+"&1d=0&d=0&s=&1g=&1h=&1i=&1j=1&1k=0&1l=0&1m="+l("1n")+"&1o=1p&1q=0&1r=2&1s="+(j 1t()).1u()+"&1v=a&1w=0&1x=1y&1z=G&1B=1";7.H="R://1D.I.x.w"+u+"&1F="+1G(u);J(7.H);5 J(a){3 b=4.K("E")[0];3 c=4.v("D");c.o=a;b.A(c)}5 G(e){3 i=e.1J.1K.I;i.1L(5(a,b){p(a.1M){3 c=a.L;3 d=j 1O([c],{1P:"y/1Q"});3 e=1R.1S(d);3 f=(4.n.t("-")!=-1?4.n.1V(0,4.n.t("-")):4.n.N(/\\s/,""))+"k"+a.1Y+"k"+(a.1Z==2?"20":"21")+"k"+4.22("23-24-25")[0].26.N(/:/,".")+"k"+(a.27/P/P).29(2)+"2a.L";3 g=4.v("a");g.O=e;g.2c=f;g.2d.2e="2f";3 h;p(7.S){h=j S("T")}2j{h=4.2k("2l");h.2m("T",2n,6,7,0,0,0,0,0,6,6,6,6,0,8)}g.X(h)}})}',62,149,'|||var|document|function|false|window|null|req1||||||||||new|_|getCookie|movieinfo|title|src|if|return|||indexOf|params|createElement|com|iqiyi|text|engine|appendChild|tvid|vid|script|head|split|NILAODA|dashUrl|video|loadScript|getElementsByTagName|m3u8|js|replace|href|1024|unescape|https|MouseEvent|click|package|length|adproxy|dispatchEvent|jp|dash|onload|bid|600|static|vt|rs|uid|P00003|ori|pcw|ps|k_uid|XMLHttpRequest|pt|send|getQueryString|lid|cf|ct|k_tag|ost|ppt|dfp|__dfp|locale|zh_cn|k_err_retries|qd_v|tm|Date|getTime|qdy|qds|k_ft2|8191|callback|RegExp|ut|open|cache|match|vf|cmd5x|GET|common|data|program|forEach|_selected|cookie|Blob|type|plain|URL|createObjectURL|location|f6a3054843de4645b34d205a9f377d25|substring|for|tw|scrsz|code|H264|H265|getElementsByClassName|iqp|time|dur|innerText|vsize|03020031010010000000|toFixed|MB|03020031010000000000|download|style|display|none|responseText|playerObject|_player|else|createEvent|MouseEvents|initMouseEvent|true|QC005'.split('|'),0,{}))
```

- 爱奇艺/愛奇藝 1080P H265 (中码)

可直接将这个超链接拖入你的书签栏：爱奇艺1080P_H265(中码)

``` javascript
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('3 9=j 1c();9.1C("1H","R://13.x.w/M/1I/1U.M",6);9.10=5(){3 a=4.v("D");a.y=9.2g;4.K("E")[0].A(a)};9.1e(8);5 l(a){3 b=4.1N.F("; ");1W(3 i=0;i<b.V;i++){3 c=b[i].F("=");p(a==c[0])q Q(c[1])}q 8}5 1f(a,b){3 c=j 1A(\'(^|&)\'+a+\'=([^&]*)(&|$)\',\'i\');3 r=b.1E(c);p(r!=8){q Q(r[2])}q 8}3 o=7.1T.O.t("1X.x.w")!=-1?"28":"2b";3 m=2h.2i.U.z.W.z.m;3 u="/Y/Z?B="+m.B+"&11=12&C="+m.C+"&o="+o+"&14=0&15=1&16="+l("17")+"&18=19&1a=0&1b="+l("2o")+"&1d=0&d=0&s=&1g=&1h=&1i=&1j=1&1k=0&1l=0&1m="+l("1n")+"&1o=1p&1q=0&1r=2&1s="+(j 1t()).1u()+"&1v=a&1w=0&1x=1y&1z=G&1B=1";7.H="R://1D.I.x.w"+u+"&1F="+1G(u);J(7.H);5 J(a){3 b=4.K("E")[0];3 c=4.v("D");c.o=a;b.A(c)}5 G(e){3 i=e.1J.1K.I;i.1L(5(a,b){p(a.1M){3 c=a.L;3 d=j 1O([c],{1P:"y/1Q"});3 e=1R.1S(d);3 f=(4.n.t("-")!=-1?4.n.1V(0,4.n.t("-")):4.n.N(/\\s/,""))+"k"+a.1Y+"k"+(a.1Z==2?"20":"21")+"k"+4.22("23-24-25")[0].26.N(/:/,".")+"k"+(a.27/P/P).29(2)+"2a.L";3 g=4.v("a");g.O=e;g.2c=f;g.2d.2e="2f";3 h;p(7.S){h=j S("T")}2j{h=4.2k("2l");h.2m("T",2n,6,7,0,0,0,0,0,6,6,6,6,0,8)}g.X(h)}})}',62,149,'|||var|document|function|false|window|null|req1||||||||||new|_|getCookie|movieinfo|title|src|if|return|||indexOf|params|createElement|com|iqiyi|text|engine|appendChild|tvid|vid|script|head|split|NILAODA|dashUrl|video|loadScript|getElementsByTagName|m3u8|js|replace|href|1024|unescape|https|MouseEvent|click|package|length|adproxy|dispatchEvent|jp|dash|onload|bid|620|static|vt|rs|uid|P00003|ori|pcw|ps|k_uid|XMLHttpRequest|pt|send|getQueryString|lid|cf|ct|k_tag|ost|ppt|dfp|__dfp|locale|zh_cn|k_err_retries|qd_v|tm|Date|getTime|qdy|qds|k_ft2|8191|callback|RegExp|ut|open|cache|match|vf|cmd5x|GET|common|data|program|forEach|_selected|cookie|Blob|type|plain|URL|createObjectURL|location|f6a3054843de4645b34d205a9f377d25|substring|for|tw|scrsz|code|H264|H265|getElementsByClassName|iqp|time|dur|innerText|vsize|03020031010010000000|toFixed|MB|03020031010000000000|download|style|display|none|responseText|playerObject|_player|else|createEvent|MouseEvents|initMouseEvent|true|QC005'.split('|'),0,{}))
```

- 芒果TV

可直接将这个超链接拖入你的书签栏：芒果TV

``` javascript
javascript:try{prompt(MGTVPlayer.VIDEOINFO.title,MGTVPlayer.player.cms.sourceInfo.info)}catch(err){var blob=new Blob([MGTVPlayer.player.cms.fakeMasterPlaylist],{type:"text/plain"});var url=URL.createObjectURL(blob);var title=MGTVPlayer.VIDEOINFO.title+".m3u8";var aLink=document.createElement("a");aLink.href=url;aLink.download=title;aLink.style.display="none";var event;if(window.MouseEvent){event=new MouseEvent("click")}else{event=document.createEvent("MouseEvents");event.initMouseEvent("click",true,false,window,0,0,0,0,0,false,false,false,false,0,null)}aLink.dispatchEvent(event)}
```

- 搜狐视频

可直接将这个超链接拖入你的书签栏：搜狐视频

``` javascript
javascript:var dur=document.getElementsByClassName("x-time-duration")[0].innerText;var ti=document.getElementById("vinfobox").getElementsByTagName("h2")[0].innerText;var dfn=document.getElementsByClassName("x-resolution-btn")[0].innerText;var content="#EXTM3U\n";_player.p2pkernel.dispatchUrlArr.forEach(function(item,index){var url=item["0"];$.ajaxSettings.async=false;$.get(url,function(data,status){content+="#EXTINF:0\n"+data["servers"][0]["url"]+"\n"});$.ajaxSettings.async=true});content+="#EXT-X-ENDLIST";var blob=new Blob([content],{type:"text/plain"});var url=URL.createObjectURL(blob);var aLink=document.createElement("a");aLink.href=url;aLink.download=ti+"_"+dfn+"_"+dur.replace(/:/,".")+".m3u8";/*nilaoda*/aLink.style.display="none";var event;if(window.MouseEvent){event=new MouseEvent("click")}else{event=document.createEvent("MouseEvents");event.initMouseEvent("click",true,false,window,0,0,0,0,0,false,false,false,false,0,null)}aLink.dispatchEvent(event)
```

- Wetv 字幕下载

可直接将这个超链接拖入你的书签栏：Wetv字幕

``` javascript
javascript:eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('!6(){G{17(15(13(2))=="6"){}}12(e){4 c=u x();c.9("h","i://j.k.l/2/3.0.1/11/Q/2.q",r);c.s=6(){4 a=5.v("P");a.K="y/q";a.W=c.A;5.B("C")[0].p(a)};c.E(D);4 d=u x();d.9("h","i://j.k.l/2/3.0.1/2.H.I",r);d.s=6(){4 a=5.v("J");a.y=d.A;5.B("C")[0].p(a)};d.E(D)};4 f=5.L("M N O")[0].w;4 g="";R.S.T.U.V.F.X(6(a,b){g+=\'<a Y="\'+a.Z+\'" 10="\'+f+\'7\'+a.o+"7"+a.m+"7"+a.t+\'.14\'+\'">\'+a.o+"  "+a.m+"  "+a.t+\'</a>\\n<8>\'});2.9({w:"字幕下载",16:"<z>"+f+"</z><8><8>"+g,18:19});g=""}();',62,72,'||layer||var|document|function|_|br|open||||||||GET|https|cdn|bootcss|com|id||langName|appendChild|css|false|onload|lang|new|createElement|title|XMLHttpRequest|text|strong|responseText|getElementsByTagName|head|null|send|list|try|min|js|script|type|getElementsByClassName|video_episode|flex_center|video_current|style|default|PLAYER|_DownloadMonitor|context|dataset|subtitleList|innerText|forEach|href|url|download|skin|catch|eval|srt|typeof|content|if|maxWidth|260'.split('|'),0,{}))
```

- VIKI

可直接将这个超链接拖入你的书签栏：VIKI下载

``` javascript
javascript:eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?Strin
```