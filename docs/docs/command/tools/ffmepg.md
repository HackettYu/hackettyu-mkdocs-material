# ffmpeg

- ffmpeg -y -i ${test.mp4} -ar 16000 -ac 1 -sample_fmt s16 ${test.mp3}
- ffmpeg  -i  input.avi  -q  1  -c  copy output.mov  `转码`
- ffmpeg -f image2 image%d.jpg vedio.mpg  `将图片合成视频`
- ffmpeg -i vedio.mpg image%d.jpg  `将视频分解成图片序列集`
- ffmpeg -re -i vedio.flv -c copy -f mpegts udp://localhost:1234 `udp 推流`
- ffmpeg -re -i vedio.mp4 -c copy -f flv rtmp://server/live/streamname `rtmp 推流`
- ffmpeg -i "https://res001.geekbang.org/media/audio/3c/ae/3cb2135163e937bf84a90066303a94ae/ld/ld.m3u8" -bsf:a aac_adtstoasc -vcodec copy -c copy -crf 50 file.mp4 # m3u8 conver to mp4 `将 m3u8 转码`
- ffmpeg -y -i <input_fname> -ar 16000 -ac 1 -sample_fmt s16 <out_fname> `生成 flac 格式音频`

- 分割音频文件

``` sh
ffmpeg -i {{file.wav}} -f segment -segment_time {{30}} -c copy {{parts/output%09d.wav}}
```
